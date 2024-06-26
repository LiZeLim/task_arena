'use server'

import { sql } from "@vercel/postgres";
import { User } from "@/app/lib/definitions";

async function fetchUserByEmail(email: string) {
    try {
        const db_users = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return db_users.rows;
    } catch (error) {
        console.log("Database Error:", error);
        throw new Error('Failed to fetch users');
    }
}

async function fetchUserById(id: string) {
    try {
        const db_users = await sql<User>`SELECT * FROM users WHERE user_id=${id}`;
        return db_users.rows;
    } catch (error) {
        console.log("Database Error:", error);
        throw new Error('Failed to fetch users');
    }
}

export async function fetchPassword(
    email: string
) {
    try {
        const password = await fetchUserByEmail(email);
        return password[0].password;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch passwords');
    }
}

export async function fetchUserId(
    email: string
) {
    try {
        const id = await fetchUserByEmail(email);
        return id[0].user_id;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch userId");
    }
}

export async function fetchUserName(email: string) {
    try {
        const name = await fetchUserByEmail(email);
        return name[0].name;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch name");
    }
}

export async function fetchNameById(id: string) {
    try {
        const name = await fetchUserById(id);
        return name[0].name;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch name");
    }
}