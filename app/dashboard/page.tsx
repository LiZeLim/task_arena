/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ActivityCalendar } from "@/app/components/activityCalendar";
import { fetchNameById } from "@/app/api/backend/db";

export default function Dashboard() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const userId = searchParams.get("id") as string;
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        async function getNameById(userId: string) {
            const fetchedName = await fetchNameById(userId);
            setName(fetchedName);
        }

        if (userId) {
            getNameById(userId);
        }
    }, [userId]);

    if (!name) {
        return <div>Loading...</div>;
    }

    return (
        <section className="p-4 bg-slate-300">
            <div className="flex flex-row">
                <div>
                    {" "}
                    {/* User info section */}
                    <div className="card flex-col w-full px-4 py-6 bg-base-100">
                        <div>
                            <h1 className="card-title">{name}</h1>
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
