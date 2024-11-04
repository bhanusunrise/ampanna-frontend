// src/app/dbInstallation.tsx
const { PrismaClient } = require('@prisma/client');
const { UNIT_CATEGORY_LIST, UNIT_LIST, UNIT_CONVERSIONS } = require('../src/app/constants/dbInstallation');
const { ITEM_CATEGORY_LIST } = require('../src/app/constants/itemCategories'); // Import the new item categories

const prisma = new PrismaClient();

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

        // Insert all unit categories first, as units depend on them
        for (const category of UNIT_CATEGORY_LIST) {
            await prisma.unit_Categories.create({ data: category });
        }

        // Insert all units next, as unit conversions depend on them
        for (const unit of UNIT_LIST) {
            await prisma.units.create({ data: unit });
        }

        // Insert unit conversions last to resolve foreign key dependencies
        for (const conversion of UNIT_CONVERSIONS) {
            await prisma.unit_Conversions.create({
                data: {
                    conversion_id: conversion.conversion_id,
                    from_unit: conversion.from_unit,
                    to_unit: conversion.to_unit,
                    value: conversion.value,
                },
            });
        }

        // Insert item categories last
        for (const itemCategory of ITEM_CATEGORY_LIST) {
            await prisma.item_Categories.create({ data: itemCategory });
        }

        console.log('Inserted units, categories, conversions, and item categories successfully.');

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

// Execute the migration prevention and data insertion
preventMigration();
