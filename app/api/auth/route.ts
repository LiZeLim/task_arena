'use server'

import { sql } from "@vercel/postgres";
import { User } from "@/app/lib/definitions";

export async function fetchPassword(
    email: string
) {
    try {
        const db_pass = await sql<User>`SELECT password FROM users WHERE email=${email}`;
        const pass = db_pass.rows;

        return pass[0].password;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch passwords');
    }
}
