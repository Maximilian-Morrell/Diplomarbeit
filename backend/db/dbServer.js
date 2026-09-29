import { pool } from './dbUtils.js'

export async function CheckDB() {
    console.log("Checking DB")
    var con;

    try {
        con = await pool.getConnection();

        await con.query(`
            CREATE TABLE IF NOT EXISTS countries (
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL)`);

        console.log("Table countries is ready!")

        await con.query(`
            CREATE TABLE IF NOT EXISTS cities (
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(25) NOT NULL,
            region VARCHAR(255) NOT NULL,
            description VARCHAR(255), 
            country_id INT NOT NULL,
            
            FOREIGN KEY (country_id)
                REFERENCES countries(id))`);

        console.log("Table countries is ready!")
    } catch (err) {
        console.log(err)
    }
}

// Gets
export async function GetCountries() {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM countries');

        conn.release();
        return rows;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}