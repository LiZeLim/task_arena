export type User = {
    user_id: string,
    name: string,
    email: string,
    password: string;
}

export type Workout = {
    workout_id: string,
    date: string,
    target: string; //chest, back, legs, arms
};

export type Exercise = {
    exercise_id: string,
    name: string;
}