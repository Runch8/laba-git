const API_URL = "http://localhost:3001";

// ===== LOGIN =====

export async function updateTrainer(
    id: number,
    data: any
) {

    await fetch(
        `${API_URL}/trainers/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify(data)
        }
    );

}

export async function login(
    email: string,
    password: string
) {

    const res = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    return res.json();

}

// ===== TRAINERS =====

// GET TRAINERS

export async function getTrainers() {

    const res = await fetch(
        `${API_URL}/trainers`
    );

    return res.json();

}

// ADD TRAINER

export async function addTrainer(
    data: any
) {

    const res = await fetch(
        `${API_URL}/trainers`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    return res.json();

}

// DELETE TRAINER

export async function deleteTrainer(
    id: number
) {

    await fetch(
        `${API_URL}/trainers/${id}`,
        {
            method: "DELETE"
        }
    );

}

// ===== MEMBERS =====

// GET MEMBERS

export async function getMembers() {

    const res = await fetch(
        `${API_URL}/members`
    );

    return res.json();

}

// ADD MEMBER

export async function addMember(
    data: any
) {

    const res = await fetch(
        `${API_URL}/members`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    return res.json();

}

// DELETE MEMBER

export async function updateMember(

    id: number,
    data: any

) {

    await fetch(

        `${API_URL}/members/${id}`,

        {

            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify(data)

        }

    );

}

export async function deleteMember(
    id: number
) {

    await fetch(
        `${API_URL}/members/${id}`,
        {
            method: "DELETE"
        }
    );

}

// ===== SESSIONS / CALENDAR =====

// GET SESSIONS

export async function getSessions() {

    const res = await fetch(
        `${API_URL}/sessions`
    );

    return res.json();

}

// ADD SESSION

export async function addSession(
    data: any
) {

    const res = await fetch(
        `${API_URL}/sessions`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    return res.json();

}

// DELETE SESSION

export async function deleteSession(
    id: number
) {

    await fetch(
        `${API_URL}/sessions/${id}`,
        {
            method: "DELETE"
        }
    );

}