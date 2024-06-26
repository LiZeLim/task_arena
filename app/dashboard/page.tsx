/* eslint-disable react/no-unescaped-entities */

import React, { useState, useEffect, Suspense } from "react";
import { ActivityCalendar } from "@/app/components/activityCalendar";
import { Name } from "@/app/components/name";
import { Loading } from "@/app/components/loading"

export default function Dashboard() {
    return (
        <section className="p-4 bg-slate-300">
            <div className="flex flex-row">
                <div>
                    {" "}
                    {/* User info section */}
                    <div className="card flex-col w-full px-4 py-6 bg-base-100">
                        <div>
                            <h1 className="card-title">
                                <Suspense fallback={<Loading/>}>
                                    <Name/>
                                </Suspense>
                            </h1>
                        </div>
                        <div className="divider"></div>
                        <ActivityCalendar />
                    </div>
                </div>
                <div>
                    {" "}
                    {/* User stats section */}
                    something for now
                </div>
            </div>
        </section>
    );
}
