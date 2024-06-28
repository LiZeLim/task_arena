/* eslint-disable react/no-unescaped-entities */

import React, { useState, useEffect, Suspense } from "react";
import { ActivityCalendar } from "@/app/components/activityCalendar";
//import { Name } from "@/app/components/name";
import { Loading } from "@/app/components/loading"
import { WorkoutsTable } from "@/app/components/workoutsTable";
import { UserStats } from "@/app/components/userStats";
import { fetchUserById, fetchWorkoutsById } from "@/app/api/backend/db";
import { QueryResult, QueryResultRow } from "@vercel/postgres";

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

export default async function Dashboard({ params }: { params: { id: string } }) {
    const user = await getUser(params.id);
    const name = user.name;
    console.log("Username:", user.name);

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
                            <UserStats params={stats}/>
                        </div>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                    <div className="flex flex-col">
                        {/* User stats section */}
                        <div className="card card-compact bg-base-100">
                            <div className="card-body">
                                <WorkoutsTable />
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="card card-compact bg-base-100">
                            <div className="card-body">
                                <WorkoutsTable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};