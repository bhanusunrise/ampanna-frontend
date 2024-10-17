const { PrismaClient } = require('@prisma/client');
const { UNIT_LIST, UNIT_CONVERSIONS } = require('../src/app/constants/dbInstallation'); 

const prisma = new PrismaClient();


// Main function to prevent migration and insert data
async function preventMigration() {
  try {
    // Get the list of tables and check for existing records
    const tables = await prisma.$queryRaw`SHOW TABLES;`;

    for (const table of tables) {
      const tableName = Object.values(table)[0];

      if (tableName === '_prisma_migrations') continue;

      const countResult = await prisma.$queryRawUnsafe(`SELECT COUNT(*) as count FROM \`${tableName}\`;`);
      const recordCount = countResult[0].count;

      if (recordCount > 0) {
        console.error(`Migration not allowed: Table '${tableName}' has ${recordCount} records.`);
        process.exit(1);
      }
    }

    console.log('No data found in any tables (except _prisma_migrations). Migration can proceed.');

    // Insert all units from UNIT_LIST into the Units table
    for (const unit of UNIT_LIST) {
      await prisma.units.create({ data: unit });
    }

    // Insert unit conversions
    for (const conversion of UNIT_CONVERSIONS) {
      

      await prisma.unit_Conversions.create({
        data: {
          conversion_id: conversion.conversion_id,
          from_unit: conversion.from_unit,
          value: conversion.value,
          to_unit: conversion.to_unit,
        },
      });
    }

    console.log('Inserted units and conversions.');

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the migration prevention and data insertion
preventMigration();
