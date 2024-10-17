const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function preventMigration() {
    try {
        // Get the list of tables in the database
        const tables = await prisma.$queryRaw`SHOW TABLES;`;

        // Loop through each table and check for records
        for (const table of tables) {
            const tableName = Object.values(table)[0]; // Get the table name from the returned object

            // Skip the _prisma_migrations table
            if (tableName === '_prisma_migrations') {
                continue;
            }

            // Use a raw query with template literals to count records
            const countResult = await prisma.$queryRawUnsafe(`SELECT COUNT(*) as count FROM \`${tableName}\`;`);
            const recordCount = countResult[0].count; // Get the count from the result

            if (recordCount > 0) {
                console.error(`Migration not allowed: Table '${tableName}' has ${recordCount} records.`);
                process.exit(1);
            }
        }

        console.log('No data found in any tables (except _prisma_migrations). Migration can proceed.');

    } catch (error) {
        console.error('Error checking database:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

preventMigration();
