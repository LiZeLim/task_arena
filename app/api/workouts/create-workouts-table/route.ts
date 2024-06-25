import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const result = await sql`
            CREATE TABLE IF NOT EXISTS workouts (workoutId UUID DEFAULT uuid_generate_v4() PRIMARY KEY, date DATE NOT NULL, userId UUID REFERENCES users(userId));`;
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}