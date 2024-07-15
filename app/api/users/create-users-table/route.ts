import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const result = await sql`
            CREATE TABLE IF NOT EXISTS users (user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, name VARCHAR(255) NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);`;
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
