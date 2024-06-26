"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchNameById } from "@/app/api/backend/db";

export const Name = () => {
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

    return (<div>{name}</div>);
}
