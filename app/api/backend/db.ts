'use server'

import { sql } from "@vercel/postgres";
import { User } from "@/app/lib/definitions";

async function fetchUserByEmail(email: string) {
    try {
        const db_users = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return db_users.rows;
    } catch (error) {
        console.log("Database Error:", error);
        //throw new Error('Failed to fetch users');
        return []
    }
}

export async function fetchUserById(id: string) {
    try {
        const db_users = await sql<User>`SELECT * FROM users WHERE user_id=${id}`;
        return db_users.rows;
    } catch (error) {
        console.log("Database Error:", error);
        //throw new Error('Failed to fetch users');
        return []
    }
}


export async function fetchPassword(
    email: string
) {
    try {
        const password = await fetchUserByEmail(email);
        if (password.length == 0) {
            return "-1";
        }

        return password[0].password;
    } catch (error) {
        console.error('Database Error:', error);
        //throw new Error('Failed to fetch passwords');
        return "-1";
    }
}

export async function fetchUserId(
    email: string
) {
    try {
        const id = await fetchUserByEmail(email);
        if (id.length == 0) {
            return "-1";
        }

        return id[0].user_id;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch userId");
    }
}

export async function fetchUserName(email: string) {
    try {
        const name = await fetchUserByEmail(email);
        if (name.length == 0) {
            return "-1";
        }

        return name[0].name;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch name");
    }
}

export async function fetchNameById(id: string) {
    try {
        const name = await fetchUserById(id);
        if (name.length == 0) {
            return "-1";
        }

        return name[0].name;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch name");
    }
}