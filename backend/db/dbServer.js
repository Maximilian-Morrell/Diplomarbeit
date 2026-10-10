import { pool } from './dbUtils.js'
import bcrypt from "bcryptjs";
import crypto from 'crypto';
import { RegisterEMail } from '../mail/mailserver.js';

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

        console.log("Table cities is ready!")


        await con.query(`
            CREATE TABLE IF NOT EXISTS users (
            id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            birthDay DATE NOT NULL,
            username VARCHAR(255) NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            bio TEXT,
            TFA_ENABLED TINYINT NOT NULL DEFAULT 0,
            emailVerified TINYINT NOT NULL DEFAULT 0,
            emailVerificationToken VARCHAR(255),
            emailVerificationExpires DATETIME
            )`);

        console.log("Table users is ready!")

        await con.query(`
            CREATE TABLE IF NOT EXISTS permissions (
            id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name varchar(255) NOT NULL UNIQUE)`);


        await con.query(`
            CREATE TABLE IF NOT EXISTS user_permissions (
            user_id int NOT NULL,
            permission_id int NOT NULL,
            
            UNIQUE (user_id, permission_id),
            
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (permission_id) REFERENCES permissions(id))`);

        await con.query(`
            INSERT IGNORE  INTO permissions (name)
            VALUES 
            ('User'), ('CountryAdmin'), ('CityAdmin'), ('UserAdmin'), ('AlphaTester'), ('BetaTester')`);

        console.log("Table permissions is ready!")
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

export async function GetCountry(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM countries WHERE id = ?', [id]);

        conn.release();
        return rows[0];
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function GetCities() {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM cities');

        conn.release();
        return rows;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function GetCity(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM cities WHERE id = ?', [id]);

        conn.release();
        return rows[0];
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function AddUser(firstName, lastName, email, birthDay, username, password) {
    var conn;

    try {
        const token = crypto.randomBytes(32).toString("hex");
        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

        const minutes = 30;
        const expires = new Date(Date.now() + minutes * 60 * 1000)

        conn = await pool.getConnection();

        const hashedPassword = await bcrypt.hash(password, 10);

        const UserResult = await conn.query('INSERT INTO users (firstName, lastName, email, birthDay, username, password_hash, emailVerificationToken, emailVerificationExpires) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, email, birthDay, username, hashedPassword, tokenHash, expires]);

        const user = await GetUser(UserResult.insertId);
        console.log("User created:", user);
        const DefaultPermission = await GetPermissionbyID(1); // Default permission is 'User'
        console.log("Default permission:", DefaultPermission);
        const result = await AddPermissionToUser(user.id, DefaultPermission.id);

        const permissions = await GetPermissionsByUserId(user.id);
        user.permissions = permissions.map(p => p.name);

        console.log(user);
        RegisterEMail(user, token);
        conn.release();
        return user;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function UpdateUser(userID, newEmail, firstName, lastName, username, email, bio) {
    var conn;

    try {
        conn = await pool.getConnection();

        const UserResult = await conn.query(`UPDATE users SET firstName = ?, lastName = ? , username = ?, email`)
        if (newEmail) {
            const token = crypto.randomBytes(32).toString("hex");
            const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

            const minutes = 30;
            const expires = new Date(Date.now() + minutes * 60 * 1000)
        }
        conn = await pool.getConnection();


    } catch (err) {
        console.error(err);
        if (conn) conn.release();
    }
}

export async function GetUserByVerificationToken(token) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query(`Select * FROM users WHERE emailVerificationToken = '${token}'`)
        conn.release();

        return rows[0];

    } catch (err) {
        console.error(err);
        if (conn) conn.release();
        return null;
    }
}

export async function VerifyUser(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        await conn.query("UPDATE users SET emailVerified = 1, emailVerificationToken = NULL, emailVerificationExpires = NULL WHERE id = " + id);
        conn.release();

        return true;
    } catch (err) {
        console.error(err);
        if (conn) conn.release();
        return false;
    }
}

export async function GetUsers() {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM users');
        conn.release();
        return rows;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }
}

export async function GetUser(id) {

    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM users WHERE id = ?', [id]);

        const user = rows[0];
        const userPermissions = await GetPermissionsByUserId(user.id);
        user.permissions = userPermissions.map(p => p.name);

        console.log("Fetched user:", user);
        conn.release();
        return user;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }
}

export async function GetPermissions() {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM permissions');
        conn.release();
        return rows;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }
}

export async function GetPermissionbyID(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM permissions WHERE id = ?', [id]);
        conn.release();
        return rows[0];
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }
}

export async function GetPermissionsByUserId(userId) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM user_permissions WHERE user_id = ?', [userId]);
        const permissions = [];
        for (const row of rows) {
            const permission = await GetPermissionbyID(row.permission_id);
            permissions.push(permission);
        }

        console.log("User permissions:", permissions);
        conn.release();
        return permissions;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }
}

export async function AddPermissionToUser(userId, permissionId) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query('INSERT INTO user_permissions (user_id, permission_id) VALUES (?, ?)', [userId, permissionId]);
        conn.release();
        return result;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }
}

export async function LogIn(email, password) {
    var conn;

    try {
        conn = await pool.getConnection();
        const [user] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log("Fetched user:", user);
        if (!user) {
            console.log("User not found");
            conn.release();
            return null;
        }

        console.log(user)
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            console.log("Password does not match");
            conn.release();
            return null;
        }
        const permissions = await GetPermissionsByUserId(user.id);
        user.permissions = permissions.map(p => p.name);
        console.log("User logged in:", user);
        conn.release();
        return user;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }
}