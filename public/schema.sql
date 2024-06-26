CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    email TEXT NOT NULL UNIQUE, 
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS workouts (
    workout_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    workout_date DATE NOT NULL,
    target_muscles VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS exercises (
    exercise_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS workout_exercises (
    workout_exercises_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    workout_id UUID REFERENCES workouts(workout_id) ON DELETE CASCADE,
    exercise_id UUID REFERENCES exercises(exercise_id) ON DELETE CASCADE,
    CONSTRAINT unique_workout_exercise UNIQUE (workout_id, exercise_id)
);

CREATE TABLE IF NOT EXISTS workout_logs (
    workout_log_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    workout_id UUID REFERENCES workouts(workout_id) ON DELETE CASCADE
);

-- Sample data
INSERT INTO users (user_id, name, email, password) VALUES
('b6f8b48e-2dfc-4f54-bb3e-54f43eaf1d73', 'Test User', 'testuser@example.com', 'password123');

INSERT INTO exercises (exercise_id, name) VALUES
('1f9f1e38-8076-4c84-9c2f-8f732d61c11e', 'Bench Press'),
('2e5d7c69-fcfc-47ae-9e2c-c57d0b34ec41', 'Squat'),
('3b4d6a44-1c3f-474b-a5bb-03339d9a6207', 'Deadlift');

INSERT INTO workouts (workout_id, workout_date, target_muscles) VALUES
('ae7c6f0e-b94c-4b09-8b2c-1d7fd29a9c53', '2024-06-25', 'Chest, Legs');

INSERT INTO workout_exercises (workout_exercises_id, workout_id, exercise_id) VALUES
('c5e2d2e1-7081-4b8e-b0e4-7f3a2dbccf57', 'ae7c6f0e-b94c-4b09-8b2c-1d7fd29a9c53', '1f9f1e38-8076-4c84-9c2f-8f732d61c11e'),
('d5f4e2a3-7cb4-4d3d-923d-3b7c2cbbe7e4', 'ae7c6f0e-b94c-4b09-8b2c-1d7fd29a9c53', '2e5d7c69-fcfc-47ae-9e2c-c57d0b34ec41');

INSERT INTO workout_logs (workout_log_id, user_id, workout_id) VALUES
('e6f7e3d5-9cb6-4f44-9365-4f1b2d7e9a67', 'b6f8b48e-2dfc-4f54-bb3e-54f43eaf1d73', 'ae7c6f0e-b94c-4b09-8b2c-1d7fd29a9c53');

