// src/api/auth.ts
const API_URL = "https://localhost:7167/api/auth"; // adjust if needed

export async function login(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // important if backend uses cookies
    });

    if (!response.ok) {
        throw new Error("Invalid login credentials");
    }

    const data = await response.json();

    // If backend returns token
    if (data.token) {
        localStorage.setItem("authToken", data.token);
    }

    return data;
}
