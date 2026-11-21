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
            name VARCHAR(255) NOT NULL,
            geoID VARCHAR(255))`);

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
            CREATE TABLE IF NOT EXISTS types (
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name varchar(255) NOT NULL UNIQUE,
            description varchar(255))`)

        await con.query(`
            CREATE TABLE IF NOT EXISTS regions (
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name varchar(255) NOT NULL UNIQUE,
            country_id INT NOT NULL,
            geoID varchar(255),
            
            FOREIGN KEY (country_id)
                REFERENCES countries(id))`)


        await con.query(`
            CREATE TABLE IF NOT EXISTS cities (
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(25) NOT NULL,
            description text, 
            picture_url VARCHAR(255),
            latitude DECIMAL(10, 8) NOT NULL,
            longitude DECIMAL(11, 8) NOT NULL,
            region_id INT NOT NULL,
            permission_id INT NOT NULL,
            geoID VARCHAR(255),
            
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
            CREATE TABLE IF NOT EXISTS interests (
            id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL
            )`)

        await con.query(`
            CREATE TABLE IF NOT EXISTS user_permissions (
            user_id int NOT NULL,
            permission_id int NOT NULL,
            
            UNIQUE (user_id, permission_id),
            
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (permission_id) REFERENCES permissions(id))`);


        console.log("Table permissions is ready!")

        await con.query(`
            CREATE TABLE IF NOT EXISTS geocategories (
            id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL UNIQUE,
            icon VARCHAR(255),
            geoapify_category VARCHAR(255) NOT NULL
            )`)

        console.log("Table GeoCategories is ready!")

        await con.query(`
            INSERT IGNORE INTO geocategories (name, icon, geoapify_category)
            VALUES
                ('Antiques shops', 'Specialty Shops', 'commercial.antiques'),
                ('Art shops', 'Art & Design', 'commercial.art'),
                ('Book shops', 'Books & Literature', 'commercial.books'),
                ('Gift shops', 'Specialty Shops', 'commercial.gift_and_souvenir'),
                ('Hobby shops', 'Specialty Shops', 'commercial.hobby'),
                ('Markets', 'Markets', 'commercial.marketplace'),
                ('Malls', 'Shopping Centres', 'commercial.shopping_mall'),

                ('Bars', 'Bars & Pubs', 'catering.bar'),
                ('Café', 'Cafés', 'catering.cafe'),
                ('Food courts', 'Restaurants & Food Courts', 'catering.food_court'),
                ('Ice cream shops', 'Ice Cream', 'catering.ice_cream'),
                ('Pubs', 'Bars & Pubs', 'catering.pub'),
                ('Restaurants', 'Restaurants & Food Courts', 'catering.restaurant'),

                ('Amusement Arcades', 'Gaming & Entertainment', 'entertainment.amusement_arcade'),
                ('Aquariums', 'Aquatic Attractions', 'entertainment.aquarium'),
                ('Bowling alleys', 'Gaming & Entertainment', 'entertainment.bowling_alley'),
                ('Cinemas', 'Performing Arts & Cinema', 'entertainment.cinema'),
                ('Galleries', 'Art Galleries', 'entertainment.gallery'),
                ('Theatres', 'Performing Arts & Cinema', 'entertainment.theatres'),
                ('Escape rooms', 'Entertainment & Attractions', 'entertainment.escape_game'),
                ('Miniature golf', 'Golf', 'entertainment.miniature_golf'),
                ('Museums', 'Museums & Heritage', 'entertainment.museums'),
                ('Planetarium', 'Museums & Heritage', 'entertainment.planetarium'),
                ('Theme parks', 'Entertainment & Attractions', 'entertainment.theme_park'),
                ('Water parks', 'Swimming & Water Parks', 'entertainment.water_park'),
                ('Zoos', 'Parks & Wildlife', 'entertainment.zoo'),

                ('Heritage sites', 'Museums & Heritage', 'heritage'),

                ('Parks', 'Parks & Wildlife', 'leisure.park'),
                ('Picnics', 'Outdoor Recreation', 'leisure.picnic'),
                ('Playgrounds', 'Entertainment & Attractions', 'leisure.playground'),
                ('Spas', 'Wellness & Fitness', 'leisure.spa'),

                ('Coastal points', 'Coastal Attractions', 'natural.coastal'),
                ('Geysers', 'Aquatic Attractions', 'natural.water.geyser'),
                ('Coral reefs', 'Aquatic Attractions', 'natural.water.reef'),
                ('Springs', 'Aquatic Attractions', 'natural.water.spring'),
                ('National park', 'Parks & Wildlife', 'national_park'),

                ('Tourist attractions', 'Entertainment & Attractions', 'tourism.attraction'),
                ('Tourist sights', 'Tours & Outdoor Activities', 'tourism.sights'),
                ('Beaches', 'Coastal Attractions', 'beach'),

                ('Ski lifts', 'Skiing', 'ski.lift'),

                ('Dive centres', 'Aquatic Attractions', 'sport.dive_centre'),
                ('Fishing spots', 'Fishing', 'sport.fishing'),
                ('Fitness spots', 'Wellness & Fitness', 'sport.fitness'),
                ('Golf courses', 'Golf', 'sport.golf_curse'),
                ('Horse riding places', 'Tours & Outdoor Activities', 'sport.horse_riding'),
                ('Ice rink', 'Ice Skating', 'sport.ice_rink'),
                ('Shooting', 'Entertainment & Attractions', 'sport.shooting'),
                ('Skateboarding', 'Skateboarding', 'sport.skateboard'),
                ('Stadiums', 'Sports Facilities', 'sport.stadium'),
                ('Swimming Pools', 'Swimming & Water Parks', 'sport.swimming_pool'),
                ('Sport tracks', 'Sports Facilities', 'sport.track'),

                ('Memorial sites', 'Museums & Heritage', 'memorial')
`);


        await con.query(`
            CREATE TABLE IF NOT EXISTS places (
            id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            latitude DECIMAL(10, 8) NOT NULL,
            longitude DECIMAL(11, 8) NOT NULL,
            address VARCHAR(255) NOT NULL,
            suburb VARCHAR(255),
            opening_hours VARCHAR(255),
            brand VARCHAR(255),
            website VARCHAR(255),
            place_id VARCHAR(255) UNIQUE,
            city_id int NOT NULL,
            category_id int NOT NULL,

            FOREIGN KEY (city_id) REFERENCES cities(id),
            FOREIGN KEY (category_id) REFERENCES geocategories(id)
            )`)

        con.release();
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

export async function GetCountryByGeoID(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM countries WHERE geoID = ?', [id]);

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

export async function GetCitiesByRegion(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM cities WHERE region_id = ?', [id]);

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

async function getCityLocation(name, countryName) {
    const cityGeoData = await fetch(`https://api.geoapify.com/v1/geocode/search?apiKey=${process.env.GEOAPIFY_API_KEY}&city=${name}&country=${countryName}&format=json`, {
        method: "GET",
        headers: {
            "User-Agent": "HolidayCityPlanerAdmin/1.0"
        }
    })
    const data = await cityGeoData.json();
    const coordinates = [data.results[0].lat, data.results[0].lon]
    return coordinates;
}

export async function AddCity(name, type, region, description, permission, geoID) {
    var conn;

    const regionO = await GetRegion(region);
    const country = await GetCountry(regionO.country_id);
    const coordinates = await getCityLocation(name, country.name)

    try {
        conn = await pool.getConnection();
        const result = await conn.query(`INSERT INTO cities (name, type, description, region_id, permission_id, latitude , longitude) VALUES (?, ?, ?, ?, ?, ?, ?)`, [name, type, description, region, permission, coordinates[0], coordinates[1]]);
        conn.release()
        return Number(result.insertId);
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

export async function AddCountry(name, geoID) {
    var conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(`INSERT INTO countries (name, geoID) VALUES (?, ?)`, [name, geoID]);
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

export async function GetTypes() {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM types');

        conn.release();
        return rows;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function GetTypesByID(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query('SELECT * FROM types WHERE id = ?', [id]);

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

export async function AddRegion(name, country_id, geoID) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`INSERT INTO regions (name, country_id, geoID) VALUES (?, ?, ?)`, [name, country_id, geoID]);
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


export async function AddType(name, description) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`INSERT INTO types (name, description) VALUES (?, ?)`, [name, description]);
        const Types = await GetTypes();

        conn.release();
        return Types;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function UpdateType(name, description, id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query(`UPDATE types SET name  = ?, description = ? WHERE id = ?`, [name, description, id]);
        const Types = await GetTypes();

        conn.release();
        return Types;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function DeleteType(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query(`DELETE FROM types WHERE id = ?`, [id]);
        const Types = await GetTypes();

        conn.release();
        return Types;
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

export async function hasCityImage(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const picture_url = await conn.query(`SELECT picture_url FROM cities WHERE id = ?`, [id]);

        conn.release();
        return picture_url[0];
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}


export async function UpdateCityImage(id, url) {
    var conn;

    try {
        conn = await pool.getConnection();

        const regions = await conn.query(`UPDATE cities SET picture_url = ? WHERE id = ?`, [url, id]);

        conn.release();
        return regions[0];
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function AddInterest(name, description) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`INSERT INTO interests (name, description) VALUES (?, ?)`, [name, description]);

        conn.release();
        return result;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function UpdateInterest(id, name, description) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`UPDATE interests SET name = ?, description = ? WHERE id = ?`, [name, description, id]);

        conn.release();
        return result;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function DeleteInterest(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`DELETE FROM interests WHERE id = ?`, [id]);

        conn.release();
        return result;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function GetInterests() {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`SELECT * FROM interests`);
        console.log(result)
        conn.release();
        return result;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function GetInterest(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`SELECT * FROM interests WHERE id = ?`, [id]);

        conn.release();
        return result;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function GetPlacesByCity(city_id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`SELECT * FROM places WHERE city_id = ?`, [city_id]);
        for (const place of result) {
            const category = await GetGeoCategoryByID(place.category_id);
            place.category = category.name;
        }

        conn.release();
        return result;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function GetPlacesByCityAndCategory(city_id, cat_id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`SELECT * FROM places WHERE city_id = ? AND category_id = ?`, [city_id, cat_id]);
        for (const place of result) {
            const category = await GetGeoCategoryByID(place.category_id);
            place.category = category.name;
        }

        conn.release();
        return result;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function GetPlaces() {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`SELECT * FROM places`);

        conn.release();
        return result;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }

    return null;
}

export async function GetPlacesForList() {
    var conn;

    try {
        conn = await pool.getConnection();
        const cities = await GetCities();
        const places = [];
        for (const city of cities) {
            const result = await GetPlacesByCity(city.id);
            const cityPlace = {
                city: city.name,
                city_id: city.id,
                places: result
            }
            places.push(cityPlace)
        }

        conn.release();
        return places;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }
}

export async function AddPlace(name = "", address, opening_hours, brand, website, place_id, city_id, suburb, category_id, long, lat) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`INSERT INTO places (name, address, opening_hours, brand, website, place_id, city_id, suburb, category_id, longitude, latitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [name, address, opening_hours, brand, website, place_id, city_id, suburb, category_id, long, lat]);

        conn.release();
        return result;
    } catch (err) {
        console.log(err)
        if (conn) conn.release();
        return null;
    }
}

export async function UpdatePlace(name = "", address, opening_hours, brand, website, place_id, city_id, suburb, category_id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(
            `UPDATE places SET name = ?, address = ?, opening_hours = ?, brand = ?, website = ?, city_id = ?, suburb = ?, category_id = ? WHERE place_id = ?`,
            [name, address, opening_hours, brand, website, city_id, suburb, category_id, place_id]
        );

        conn.release();
        return result;
    } catch (err) {
        console.log(err);
        if (conn) conn.release();
        return null;
    }
}

export async function DeletePlace(place_id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(
            `DELETE FROM places WHERE place_id = ?`,
            [place_id]
        );

        conn.release();
        return result;
    } catch (err) {
        console.log(err);
        if (conn) conn.release();
        return null;
    }
}

export async function GetGeoCategories() {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`SELECT * FROM geocategories`);

        conn.release();
        return result;
    } catch (err) {
        console.log(err);
        if (conn) conn.release();
        return null;
    }
}

export async function GetGeoCategoryByTag(tag) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`SELECT * FROM geocategories WHERE geoapify_category = ?`, [tag]);

        conn.release();
        return result[0];
    } catch (err) {
        console.log(err);
        if (conn) conn.release();
        return null;
    }
}

export async function GetGeoCategoryByID(id) {
    var conn;

    try {
        conn = await pool.getConnection();

        const result = await conn.query(`SELECT * FROM geocategories WHERE id = ?`, [id]);

        conn.release();
        return result[0];
    } catch (err) {
        console.log(err);
        if (conn) conn.release();
        return null;
    }
}