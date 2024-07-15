'use server'

import { sql } from "@vercel/postgres";
import { User, Workout } from "@/app/lib/definitions";
import { v4 as uuidv4 } from 'uuid';

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
        const db_users = await sql<
            User
        >`SELECT user_id, name, email, password, weekly_goal FROM users WHERE user_id=${id}`;
        //console.log(db_users);
        return db_users.rows;
    } catch (error) {
        console.log("Database Error:", error);
        //throw new Error('Failed to fetch users');
        return []
    }
}

export async function fetchPassword(email: string) {
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

export async function fetchUserId(email: string) {
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

export async function fetchWorkoutsById(id: string) {
    try {
        const workouts = await sql`SELECT * FROM workout_logs WL JOIN workouts W ON WL.workout_id = W.workout_id JOIN users U ON WL.user_id = U.user_id WHERE U.user_id = ${id};`;
        return workouts.rows;
    } catch (error) {
        console.log("fetch workouts by id error");
        return [];
    }
}

export async function fetchWorkoutsByDate(date: string) {
    try {
        const workouts = await sql<Workout>`SELECT workout_id FROM workouts WHERE to_char(workout_date, 'YYYY-MM-DD')=${date};`;
        return workouts.rows;
    } catch (error) {
        return [];
    }
}

export async function fetchUserWeeklyGoal(id: string) {
    try {
        const goal = await sql`SELECT weekly_goal FROM users WHERE user_id=${id}`;
        return goal.rows;
    } catch (error) {
        return [];
    }
}

//TODO view table of workouts, etc\

export async function addWorkout(id: string, target_muscles: string) {
    console.log(id, target_muscles);
    try {
        const workoutId = uuidv4();
        const workoutLogId = uuidv4();
        const currentDate = new Date().toISOString().split("T")[0];
        console.log(workoutId, workoutLogId, currentDate);
        const insertedWorkout = await sql`INSERT INTO workouts (workout_id, workout_date, target_muscles) VALUES (${workoutId}, ${currentDate} ,${target_muscles})`;
        const insertedWorkoutLog = await sql`INSERT INTO workout_logs (workout_log_id, user_id, workout_id) VALUES (${workoutLogId}, ${id}, ${workoutId})`;
        console.log("added workout");
        console.log(insertedWorkout);
        console.log(insertedWorkoutLog);
    } catch (error) {
        console.log("error inserting workout");
        return;
    }
}