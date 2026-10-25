import { pool } from './dbUtils.js'
import bcrypt from "bcryptjs";
import crypto from 'crypto';
import { AccountUpdate, EmailUpdate, NewVerificationLink, RegisterEMail, UpdateUserPassworMail } from '../mail/mailserver.js';

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
            CREATE TABLE IF NOT EXISTS permissions (
            id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name varchar(255) NOT NULL UNIQUE)`);

        await con.query(`
            INSERT IGNORE  INTO permissions (name)
            VALUES 
            ('User'), ('PlacesAdmin'), ('UserAdmin'), ('AlphaTester'), ('BetaTester')`);


        await con.query(`
            CREATE TABLE IF NOT EXISTS tags (
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name varchar(255) NOT NULL UNIQUE,
            description varchar(255))`)

        await con.query(`
            CREATE TABLE IF NOT EXISTS regions (
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name varchar(255) NOT NULL UNIQUE,
            country_id INT NOT NULL,
            
            FOREIGN KEY (country_id)
                REFERENCES countries(id))`)


        await con.query(`
            CREATE TABLE IF NOT EXISTS cities (
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(25) NOT NULL,
            description text, 
            region_id INT NOT NULL,
            permission_id INT NOT NULL,
            
            FOREIGN KEY (region_id)
                REFERENCES regions(id),
            FOREIGN KEY (permission_id)
                REFERENCES permissions(id))`);

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
            CREATE TABLE IF NOT EXISTS user_permissions (
            user_id int NOT NULL,
            permission_id int NOT NULL,
            
            UNIQUE (user_id, permission_id),
            
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (permission_id) REFERENCES permissions(id))`);


        console.log("Table permissions is ready!")
    } catch (err) {
        console.log(err)
    }
}

// Gets
export async function GetCountries(countCities) {
    var conn;

    try {
        conn = await pool.getConnection();

        if (countCities) {
            const countries = await conn.query('SELECT countries.*, COUNT(regions.id) AS regions, COUNT(cities.id) AS cities FROM countries LEFT JOIN regions ON regions.country_id = countries.id LEFT JOIN cities ON regions.id = cities.region_id GROUP BY countries.id, countries.name');

            conn.release();
            return countries.map(country => ({
                id: Number(country.id),
                name: country.name,
                regions: Number(country.regions),
                cities: Number(country.cities)
            }));
        }
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

export async function GetPermissions() {
    var conn;

    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM permissions');

        conn.release();
        return rows;
    } catch (err) {
        console.error(err);
        if (conn) conn.release();
        return null;
    }
}

export async function GetPermission(id) {
    var conn;

    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM permissions WHERE id = ?', [id]);
        conn.release();

        return rows[0];
    } catch (err) {
        console.error(err);
        if (conn) conn.release();
        return null;
    }
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

export async function UpdateUser(userID, newEmail, firstName, lastName, username, email, bio, birthDay, oldEmail) {
    var conn;

    console.log(firstName, lastName, username, bio, birthDay, userID)

    try {
        conn = await pool.getConnection();

        const UserResult = await conn.query(`UPDATE users SET firstName = ?, lastName = ? , username = ?, bio = ?, birthDay = ? WHERE id = ?`, [firstName, lastName, username, bio, birthDay, userID]);
        const newUser = await GetUser(userID);
        console.log(newUser)
        AccountUpdate(newUser)
        if (newEmail) {
            const token = crypto.randomBytes(32).toString("hex");
            const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

            const minutes = 30;
            const expires = new Date(Date.now() + minutes * 60 * 1000)
            const EMailResult = await conn.query(`UPDATE users SET email = ?, emailVerified = 0, emailVerificationToken = ?, emailVerificationExpires = ? WHERE id = ?`, [email, tokenHash, expires, userID]);
            const newEmailUser = await GetUser(userID)
            console.log(newEmailUser)
            conn.release();
            EmailUpdate(newEmailUser, token, oldEmail)
            return newEmailUser;
        }
        conn.release();
        return newUser;

    } catch (err) {
        console.error(err);
        if (conn) conn.release();
    }
}

export async function newVerificationEMail(userID) {
    var conn;

    try {
        conn = await pool.getConnection();

        const token = crypto.randomBytes(32).toString("hex");
        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

        const minutes = 30;
        const expires = new Date(Date.now() + minutes * 60 * 1000)
        const EMailResult = await conn.query(`UPDATE users SET emailVerified = 0, emailVerificationToken = ?, emailVerificationExpires = ? WHERE id = ?`, [tokenHash, expires, userID]);
        const user = await GetUser(userID)

        NewVerificationLink(user, token)

        conn.release();
        return 1
    } catch (err) {
        console.log(err);
        if (conn) conn.release();
        return null;
    }

}

export async function UpdateUserPassword(id, oldPassword, newPassword) {
    var conn;

    try {
        conn = await pool.getConnection();

        const users = await conn.query(`SELECT * FROM users WHERE id = ?`, [id])
        const user = users[0];

        console.log(users[0])
        if (bcrypt.compare(oldPassword, user.password_hash)) {
            await conn.query(`UPDATE users SET password_hash = ? WHERE id = ?`, [newPassword, id])
            conn.release();
            UpdateUserPassworMail(user)
            return "Password change successfull"
        }
        else {
            if (conn) conn.release();
            return "Wrong Password"
        }
    } catch (err) {
        console.error(err);
        if (conn) conn.release();
        return "Something went wrong with changing the password";
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


export async function GetUser(id) {

    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM users WHERE id = ?', [id]);

        const user = rows[0];
        const userPermissions = await GetPermissionsByUserId(user.id);
        user.permissions = userPermissions.map(p => p.name);

        conn.release();
        return user;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }
}

export async function GetUsers() {

    var conn;

    try {
        conn = await pool.getConnection();

        const users = await conn.query('SELECT * FROM users');

        for (const user in users) {
            const userPermissions = await GetPermissionsByUserId(user.id);
            user.permissions = userPermissions.map(p => p.name);
        }

        conn.release();
        return users;
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

export async function AddCity(name, type, region, description, permission, tags) {
    var conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(`INSERT INTO cities (name, type, description, region_id, permission_id) VALUES (?, ?, ?, ?, ?)`, [name, type, description, region, permission]);
        await ModifyTagsForCity(result.insertId, tags);
        const cities = await GetCities();
        conn.release()
        return cities;
    } catch (err) {
        console.error(err);
        if (conn) conn.release();
        return null;
    }
}

export async function UpdateCity(name, type, region, description, permission, id) {
    var conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(`Update cities SET name = ?, type = ?, region_id = ?, description = ?, permission_id = ? WHERE id = ?`, [name, type, region, description, permission, id]);
        const cities = await GetCities();
        conn.release()
        return cities;
    } catch (err) {
        console.error(err);
        if (conn) conn.release();
        return null;
    }
}

export async function AddCountry(name) {
    var conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(`INSERT INTO countries (name) VALUES (?)`, [name]);
        const countries = await GetCountries();
        conn.release()
        return countries;
    } catch (err) {
        console.error(err);
        if (conn) conn.release();
        return null;
    }
}

export async function UpdateCountry(id, name) {
    var conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(`UPDATE countries SET name  = ? WHERE id = ?`, [name, id]);
        const countries = await GetCountries();
        conn.release()
        return countries;
    } catch (err) {
        console.error(err);
        if (conn) conn.release();
        return null;
    }
}

export async function DeleteCountry(id) {
    var conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(`DELETE FROM countries WHERE id = ?`, [id]);
        const countries = await GetCountries();
        conn.release()
        return countries;
    } catch (err) {
        console.error(err);
        if (conn) conn.release();
        return null;
    }
}

export async function DeleteCity(id) {
    var conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(`DELETE FROM cities WHERE id = ?`, [id]);
        const countries = await GetCountries();
        conn.release()
        return countries;
    } catch (err) {
        console.error(err);
        if (conn) conn.release();
        return null;
    }
}

export async function GetRegions(countCities) {
    var conn;

    try {
        conn = await pool.getConnection();

        if (countCities) {
            const regions = await conn.query('SELECT regions.*, COUNT(cities.id) AS cities FROM regions LEFT JOIN cities ON regions.id = cities.region_id GROUP BY regions.id, regions.name');
            conn.release();
            return regions.map(region => ({
                id: region.id,
                name: region.name,
                country_id: region.country_id,
                cities: Number(region.cities)
            }));
        }

        const rows = await conn.query('SELECT * FROM regions');

        conn.release();
        return rows;


    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function GetTags() {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM tags');

        conn.release();
        return rows;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function GetTagsByID(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM tags WHERE id = ?', [id]);

        conn.release();
        return rows[0];
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function GetRegionsByCountry(countryID) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM regions WHERE country_id = ?', [countryID]);

        conn.release();
        return rows;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function AddRegion(name, country_id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`INSERT INTO regions (name, country_id) VALUES (?, ?)`, [name, country_id]);
        const Regions = await GetRegions();
        conn.release();
        return regions;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function UpdateRegion(name, id, country_id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query(`UPDATE regions SET name  = ?, country_id = ? WHERE id = ?`, [name, country_id, id]);
        const Regions = await GetRegions();

        conn.release();
        return Regions;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function DeleteRegion(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query(`DELETE FROM regions WHERE id = ?`, [id]);
        const Regions = await GetRegions();

        conn.release();
        return Regions;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}


export async function AddTag(name, description) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`INSERT INTO tags (name, description) VALUES (?, ?)`, [name, description]);
        const Tags = await GetTags();

        conn.release();
        return Tags;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function UpdateTag(name, description, id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query(`UPDATE tags SET name  = ?, description = ? WHERE id = ?`, [name, description, id]);
        const Tags = await GetTags();

        conn.release();
        return Tags;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function DeleteTag(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query(`DELETE FROM tags WHERE id = ?`, [id]);
        const Tags = await GetTags();

        conn.release();
        return Tags;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}


export async function GetRegion(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const regions = await conn.query(`SELECT * FROM regions WHERE id = ?`, [id]);

        conn.release();
        return regions[0];
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}
