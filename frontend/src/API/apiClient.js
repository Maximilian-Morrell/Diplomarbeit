export async function getCountries() {
    try {
        const response = await fetch('/api/get/countries');
        return response.json();
    } catch (error) {
        console.error('Error fetching countries:', error);
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

export async function signUp(firstName, lastName, email, birthYear, userName, password) {
    try {
        const response = await fetch('/api/post/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, birthYear, userName, password }),
        });
        return response.json();
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
}

export async function logIn(username, password) {
    try {
        const response = await fetch('/api/post/log-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
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