// src/app/api_new/operations/bills/create_bill/route.tsx
import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import mongoose from 'mongoose';

// Models
import Bill from '@/app/models/bill_model';
import Stock from '@/app/models/stock_model';
import Item from '@/app/models/item_model';
import UnitConversion from '@/app/models/unit_conversion_model';

// ----- Atomic counter (unchanged from your current file) -----
const CounterSchema =
  (mongoose.models.Counter as mongoose.Model<any>)?.schema ||
  new mongoose.Schema(
    { _id: { type: String, required: true }, seq: { type: Number, default: 0 } },
    { collection: 'counters' }
  );

const Counter =
  (mongoose.models.Counter as mongoose.Model<any>) ||
  mongoose.model('Counter', CounterSchema);

/**
 * Get the next bill ID as a string, atomically.
 * Initializes the counter from the current max(_id) in `bills` if missing.
 */
async function getNextBillId(): Promise<string> {
  const key = 'bills';

  // Try to increment existing counter atomically first
  let updated = await Counter.findOneAndUpdate(
    { _id: key },
    { $inc: { seq: 1 } },
    { new: true, upsert: false }
  ).lean();

  if (!updated) {
    // No counter yet -> initialize from current max numeric _id in Bill
    let startSeq = 0;
    try {
      const last = await Bill.aggregate([
        { $addFields: { _id_num: { $toInt: '$_id' } } },
        { $sort: { _id_num: -1 } },
        { $limit: 1 },
        { $project: { _id_num: 1 } },
      ]);
      startSeq = last.length ? last[0]._id_num : 0;
    } catch {
      startSeq = 0;
    }

    await Counter.create({ _id: key, seq: startSeq });

    updated = await Counter.findOneAndUpdate(
      { _id: key },
      { $inc: { seq: 1 } },
      { new: true }
    ).lean();
  }

  return String(updated!.seq);
}

// ----- Helpers -----

/**
 * Convert a quantity from `fromUnitId` to `toMainUnitId` using the UnitConversion collection.
 * Assumes `multiplier` means: 1 of first_unit_id == multiplier of second_unit_id.
 * If no direct conversion is found, tries the reverse direction by inverting the multiplier.
 */
async function toMainUnitQuantity(
  quantity: number,
  fromUnitId: string,
  toMainUnitId: string
): Promise<number> {
  if (fromUnitId === toMainUnitId) return quantity;

  // Try direct: from -> to
  const direct = await UnitConversion.findOne({
    first_unit_id: fromUnitId,
    second_unit_id: toMainUnitId,
  }).lean();

  if (direct?.multiplier && typeof direct.multiplier === 'number') {
    return quantity * direct.multiplier;
  }

  // Try reverse: to -> from (then invert)
  const reverse = await UnitConversion.findOne({
    first_unit_id: toMainUnitId,
    second_unit_id: fromUnitId,
  }).lean();

  if (reverse?.multiplier && typeof reverse.multiplier === 'number' && reverse.multiplier !== 0) {
    return quantity / reverse.multiplier;
  }

  throw new Error(
    `No unit conversion found between units ${fromUnitId} and ${toMainUnitId}.`
  );
}

/**
 * Ensure we don't oversell: (sold + damaged + deduct) <= total.
 */
function ensureAvailable(total: number, sold: number, damaged: number, deductMainQty: number) {
  const available = total - sold - damaged;
  if (deductMainQty > available + 1e-9) {
    throw new Error(
      `Insufficient stock. Available (in main unit): ${available}, requested: ${deductMainQty}`
    );
  }
}

// ----- Route -----

export async function POST(request: Request) {
  const session = await mongoose.startSession();
  try {
    await dbConnect();

    const body = await request.json();
    const { date, bill_item, additional_discount } = body;

    // Basic validation (kept from your current handler)
    if (!date || !bill_item || !Array.isArray(bill_item) || bill_item.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Date and at least one Bill Item are required' },
        { status: 400 }
      );
    }

    for (const item of bill_item) {
      if (!item.stock_id || !item.unit_id || !item.quantity || item.quantity <= 0) {
        return NextResponse.json(
          { success: false, message: 'Each Bill Item must have stock_id, unit_id and Quantity > 0' },
          { status: 400 }
        );
      }
    }

    // Start transaction (so bill save + stock deductions are atomic)
    session.startTransaction();

    // Get sequential bill id (as you already do)
    const newId = await getNextBillId(); // :contentReference[oaicite:3]{index=3}

    // Prepare processed items for Bill document
    const processedBillItems = bill_item.map((it: any, idx: number) => ({
      _id: String(idx + 1),
      stock_id: String(it.stock_id),
      unit_id: String(it.unit_id),
      quantity: Number(it.quantity),
      discount: typeof it.discount === 'number' ? it.discount : 0,
    }));

    // For each bill row: compute deduction in MAIN UNIT and update stock.sold_quantity
    for (const row of processedBillItems) {
      const stock = await Stock.findById(row.stock_id).session(session).lean();
      if (!stock) throw new Error(`Stock ${row.stock_id} not found.`);

      const itemDoc = await Item.findById(stock.item_id).session(session).lean();
      if (!itemDoc) throw new Error(`Item ${stock.item_id} not found for stock ${row.stock_id}.`);

      const mainUnitId = itemDoc.main_unit_id as string;

      // Convert billed qty to main-unit qty (if needed)
      const deductMainQty = await toMainUnitQuantity(row.quantity, row.unit_id, mainUnitId);

      // Check availability and then update stock
      const total = Number(stock.total_quantity) || 0;
      const sold = Number(stock.sold_quantity) || 0;
      const damaged = Number(stock.damaged_quantity) || 0;

      ensureAvailable(total, sold, damaged, deductMainQty);

      // Increment sold_quantity by the amount (in main unit)
      const updated = await Stock.findOneAndUpdate(
        { _id: row.stock_id },
        { $inc: { sold_quantity: deductMainQty } },
        { new: true, session }
      );

      if (!updated) {
        throw new Error(`Failed to update stock ${row.stock_id}.`);
      }
    }

    // Save the bill
    const newBill = new Bill({
      _id: newId,
      date,
      bill_item: processedBillItems,
      additional_discount: Number(additional_discount) || 0,
    });

    const savedBill = await newBill.save({ session });

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ success: true, data: savedBill }, { status: 201 });
  } catch (error: any) {
    await session.abortTransaction().catch(() => {});
    session.endSession();

    // Carry over your clean duplicate handling & general error
    if (error?.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'Duplicate bill ID. Please retry.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: error?.message || 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
