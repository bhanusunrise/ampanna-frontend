import mysql from 'mysql2/promise';

let connection;

export async function dbConnect() {
    if (connection) {
        console.log("Connected from previous connection");
        return connection;
    }

    const conString = {
        host: process.env.DB_SERVER_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    };

    try {
        connection = await mysql.createConnection(conString);
        console.log("Newly Connected to MySQL");
        return connection;
    } catch (error) {
        console.error("Error connecting to MySQL:", error);
        throw new Error('Failed to connect to the database.');
    }
}
