const { createConnection } = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

async function main() {
  const newUser = {
    host: process.env.TIDB_HOST,
    port: 4000,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE,
    ssl: process.env.TIDB_SSL === "true" ? { rejectUnauthorized: true } : null,
  };

  const rootOptions = {
    host: process.env.TIDB_HOST,
    port: 4000,
    user: 'root',
    password: '',
    ssl: process.env.TIDB_SSL === "true" ? { rejectUnauthorized: true } : null,
  };

  try {
    // Connect to TiDB as root
    const connection = await createConnection(rootOptions);
    console.log("Connected to TiDB as root!");

    // Check if user exists
    const [rows] = await connection.query(
      `SELECT user FROM mysql.user WHERE user = '${newUser.user}';`
    );

    if (rows.length === 0) {
      // Create new user if doesn't exist
      await connection.query(
        `CREATE USER '${newUser.user}'@'%' IDENTIFIED BY '${newUser.password}';`
      );
      await connection.query(
        `GRANT ALL PRIVILEGES ON *.* TO '${newUser.user}'@'%';`
      );
      await connection.query(`FLUSH PRIVILEGES;`);
      console.log(`User '${newUser.user}' created successfully!`);
    } else {
      console.log(`User '${newUser.user}' already exists!`);
    }
    
    // Close the connection
    await connection.end();
  } catch (err) {
    console.error("Error connecting to TiDB:", err);
  }
}

main();