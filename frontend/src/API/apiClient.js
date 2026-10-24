export async function getCountries(countCities = false) {
    try {
        const response = await fetch('/api/get/countries?countCities=' + countCities);
        return response.json();
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
}


export async function getPermissions() {

    try {
        const response = await fetch('/api/get/permissions');
        return response.json();
    } catch (error) {
        console.error('Error fetching permissions:', error);
        throw error;
    }
}

export async function getCities() {
    try {
        const response = await fetch('/api/get/cities');
        return response.json();
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
}

export async function signUp(firstName, lastName, email, birthDay, userName, password) {
    try {
        console.log(birthDay)
        const response = await fetch('/api/post/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, birthDay, userName, password }),
        });
        return response.json();
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
}

export async function logIn(email, password) {
    try {
        const response = await fetch('/api/post/log-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return response.json();
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
}

export async function getUserPermissions() {
    const response = await fetch('/api/get/me/permissions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include', // Include cookies in the request

    });

    if (!response.ok) {
        throw new Error("Failed to get permissions");
    }

    return await response.json();
}

export async function getUser() {
    const response = await fetch('/api/get/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include', // Include cookies in the request

    });

    if (!response.ok) {
        throw new Error("Failed to get permissions");
    }

    return await response.json();
}

export async function updateUser(firstName, lastName, username, email, bio, birthDay) {
    try {
        const response = await fetch('/api/put/me', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            credentials: 'include',
            body: JSON.stringify({
                firstName,
                lastName,
                username,
                email,
                bio,
                birthDay
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update account.');
        }

        return data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export async function changePassword(currentPassword, newPassword) {
    try {
        const response = await fetch("/api/put/me/password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
            body: JSON.stringify({
                currentPassword,
                newPassword,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to change password."
            );
        }

        return data;
    } catch (error) {
        console.error("Error changing password:", error);
        throw error;
    }
}

export async function ResendVerificationLink() {
    try {
        await fetch("/api/get/newVerificationLink", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
        });
    } catch (err) {
        console.err(err)
    }
}

export async function AddNewCity(name, type, region, description, country, permission) {
    try {
       const cities = await fetch('/api/post/city', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
            body: JSON.stringify({
                name, type, region, description, country, permission,
            }),
        });
        console.log(cities)
        return cities;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function UpdateCity(id, name, type, region, description, country, permission) {
    try {
       const cities = await fetch('/api/put/city', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
            body: JSON.stringify({
                id, name, type, region, description, country, permission,
            }),
        });
        console.log(cities)
        return cities;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function DeleteCity(id) {
    try {
       const cities = await fetch('/api/delete/city', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
            body: JSON.stringify({
                id
            }),
        });
        console.log(cities)
        return cities;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function AddNewCountry(name) {
    try {
       const countries = await fetch('/api/post/country', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
            body: JSON.stringify({
                name
            }),
        });
        console.log(countries)
        return countries;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function UpdateCountry(name, id) {
    try {
       const countries = await fetch('/api/put/country', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
            body: JSON.stringify({
                name, id
            }),
        });
        console.log(countries)
        return countries;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function DeleteCountry(id) {
    try {
       const countries = await fetch('/api/delete/country', {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
            body: JSON.stringify({
                id
            }),
        });
        console.log(countries)
        return countries;
    } catch (err) {
        console.error(err);
        throw err;
    }
}