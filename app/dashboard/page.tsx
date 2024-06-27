/* eslint-disable react/no-unescaped-entities */

import React, { useState, useEffect, Suspense } from "react";
import { ActivityCalendar } from "@/app/components/activityCalendar";
import { Name } from "@/app/components/name";
import { Loading } from "@/app/components/loading"
import { WorkoutsTable } from "@/app/components/workoutsTable";
import { UserStats } from "@/app/components/userStats";

export default function Dashboard() {
    return (
        <section className="bg-slate-300 flex min-h-screen min-w-[360px] flex-col">
            <div className="p-4 mx-auto w-full grow md:max-w-[800px] md:p-6 lg:max-w-screen-xl">
                <div className="flex w-full flex-col lg:flex-row">
                    <div>
                        {/* User info section */}
                        <div className="card flex-col w-full px-4 py-6 bg-base-100">
                            <div>
                                <h1 className="card-title">
                                    <Suspense fallback={<Loading />}>
                                        <Name />
                                    </Suspense>
                                </h1>
                            </div>
                            <div className="divider"></div>
                            <ActivityCalendar />
                            <div className="divider"></div>
                            <UserStats />
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
}
