/* eslint-disable react/no-unescaped-entities */

import React, { CSSProperties, FormEvent } from "react";
import { ActivityCalendar } from "@/app/components/activityCalendar";
import { WorkoutsTable } from "@/app/components/workoutsTable";
import { UserStats } from "@/app/components/userStats";
import { fetchUserById, fetchWorkoutsById, fetchWorkoutsByDate, fetchUserWeeklyGoal } from "@/app/api/backend/db";
import { QueryResult, QueryResultRow } from "@vercel/postgres";
import { Workout } from '@/app/lib/definitions';
import { AddWorkout } from "@/app/components/addWorkout";

import { sql } from "@vercel/postgres";

async function getUser(id: string) {
    const user = await fetchUserById(id);
    return user[0];
}

async function getWorkouts(id: string) {
    const workouts = await fetchWorkoutsById(id);
    //console.log(workouts);
    return workouts;
}

function getIndividualWorkouts(workouts: QueryResultRow[]) {
    let ls_push: QueryResultRow[] = [];
    let ls_pull: QueryResultRow[] = [];
    let ls_legs: QueryResultRow[] = [];

    for (let row of workouts) {
        //console.log(row.target_muscles);
        const muscle = row.target_muscles as string;
        if (muscle.toLowerCase() == "push") {
            ls_push.push(row);
        } else if (muscle.toLowerCase() == "pull") {
            ls_pull.push(row);
        } else if (muscle.toLowerCase() == "legs") {
            ls_legs.push(row);
        }
    }
    return [ls_push, ls_pull, ls_legs];
}

function getWeekDates() {
    const today = new Date();
    let week: string[] = [];

    for (let i = 1; i < 8; i++) {
        let monday = today.getDate() - today.getDay() + i;
        //console.log(monday);
        let day = new Date(today.setDate(monday)).toISOString().slice(0, 10);
        //console.log(day);
        week.push(day);
    }

    return week;
}

async function getCurrentWeekIds(currentWeekDates: string[]) {
    let currentWeekWorkoutsIds: Workout[] = [];

    for (let date of currentWeekDates) {
        let dateWorkout = await fetchWorkoutsByDate(date);

        for (let work of dateWorkout) {
            currentWeekWorkoutsIds.push(work);
        }
    }

    return currentWeekWorkoutsIds;
}

export default async function Dashboard({ params }: { params: { id: string } }) {
    const user = await getUser(params.id);
    const name = user.name;
    console.log("Username:", user.name, user.weekly_goal);
    //console.log(user);

    const workouts = await getWorkouts(params.id);
    //console.log("workouts", workouts.length);

    const individualWorkouts = getIndividualWorkouts(workouts);
    const totalPush: number = individualWorkouts[0].length;
    const totalPull: number = individualWorkouts[1].length;
    const totalLegs: number = individualWorkouts[2].length;

    const stats = {
        numPush: totalPush,
        numPull: totalPull,
        numLegs: totalLegs
    };

    let currentWeekDates: string[] = getWeekDates();
    //console.log(currentWeekDates);
    let currentWeekWorkoutsIds: Workout[] = await getCurrentWeekIds(currentWeekDates);
    //console.log(currentWeekWorkoutsIds);

    const workoutGoalRatio = Math.round((currentWeekWorkoutsIds.length / user.weekly_goal) * 100);
    //console.log(workoutGoalRatio);

    return (
        <section className="bg-slate-300 flex min-h-screen min-w-[360px] flex-col">
            <div className="p-4 mx-auto w-full grow md:max-w-[800px] md:p-6 lg:max-w-screen-xl">
                <div className="flex w-full flex-col lg:flex-row">
                    <div>
                        {/* User info section */}
                        <div className="card flex-col w-full px-4 py-6 bg-base-100">
                            <div>
                                <h1 className="card-title">
                                    {/* <Suspense fallback={<p>hi</p>}>
                                        <Name />
                                    </Suspense> */}
                                    {name}
                                </h1>
                            </div>
                            <div className="divider"></div>
                            <ActivityCalendar />
                            <div className="divider"></div>
                            <div className="ml-auto mr-auto">
                                <UserStats params={stats} />
                            </div>
                        </div>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                    <div className="flex flex-col">
                        {/* User stats section */}
                        <div className="card card-compact bg-base-100">
                            <div className="card-body flex-row ml-auto mr-auto">
                                <div
                                    className="radial-progress"
                                    style={
                                        {
                                            "--value": workoutGoalRatio,
                                        } as CSSProperties
                                    }
                                    role="progressbar"
                                >
                                    {workoutGoalRatio}%
                                </div>
                                <div className="card-title">
                                    Monday start: {currentWeekDates[0]}
                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="card card-compact bg-base-100">
                            <div className="card-body">
                                <WorkoutsTable />
                            </div>
                        </div>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                    <div>
                        <AddWorkout params={params} />
                    </div>
                </div>
            </div>
        </section>
    );
};