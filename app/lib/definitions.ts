export type User = {
    user_id: string,
    name: string,
    email: string,
    password: string,
    weekly_goal: number;
};

export type Workout = {
    workout_id: string,
    date: string,
    target: string; //chest, back, legs, arms
};

export type Exercise = {
    exercise_id: string,
    name: string;
};

export type WorkoutLog = {
    workout_log_id: string,
    user_id: string,
    workout_id: string
};