const { PrismaClient } = require('@prisma/client');
const { UNIT_LIST } = require('../src/app/constants/dbInstallation'); // Adjust the path if necessary

const prisma = new PrismaClient();

async function preventMigration() {
    try {
        const tables = await prisma.$queryRaw`SHOW TABLES;`;

        for (const table of tables) {
            const tableName = Object.values(table)[0];

            if (tableName === '_prisma_migrations') {
                continue;
            }

            const countResult = await prisma.$queryRawUnsafe(`SELECT COUNT(*) as count FROM \`${tableName}\`;`);
            const recordCount = countResult[0].count;

            if (recordCount > 0) {
                console.error(`Migration not allowed: Table '${tableName}' has ${recordCount} records.`);
                process.exit(1);
            }
        }

        console.log('No data found in any tables (except _prisma_migrations). Migration can proceed.');

        for (const unit of UNIT_LIST) {
            const newUnit = await prisma.units.create({ data: unit });
            console.log('Inserted new unit:', newUnit);
        }

    } catch (error) {
        console.error('Error checking database:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

preventMigration();
