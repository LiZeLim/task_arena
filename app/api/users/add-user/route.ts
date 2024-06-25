import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { users } from "@/app/lib/placeholder-data"

export async function GET() {
    try {
        const insertedUsers = await Promise.all(
            users.map( async (user) => {
                await sql`INSERT INTO users (userId, name, email, password) VALUES (${user.userId}, ${user.name}, ${user.email}, ${user.password});`;
            })
        )
        
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    const dbUsers = await sql`SELECT * FROM users;`;
    return NextResponse.json({ dbUsers }, { status: 200 });
}
