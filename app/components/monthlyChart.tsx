"use client";

import dynamic from "next/dynamic";
import "chart.js/auto";
import { QueryResultRow } from "@vercel/postgres";
import { defaults } from "chart.js/auto";

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const LineChart = ({ monthlyFreq }: { monthlyFreq: QueryResultRow[]}) => {
    const Line = dynamic(
        () => import("react-chartjs-2").then((mod) => mod.Line),
        {
            ssr: false,
        }
    );

    //console.log(monthlyFreq);
    let monthlyData: Array<Number> = new Array<Number>(12).fill(0);
    for (let month of monthlyFreq ) {
        //console.log(month, month.workout_month as number);
        const m = month.workout_month as number;
        const n = month.total_workouts as number;
        monthlyData[m - 1] = n;
    }

    const data = {
        labels: MONTHS,
        datasets: [
            {
                label: "Current Year Monthly Chart",
                data: monthlyData,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.3,
            },
        ],
    };

    return (
        <div className="min-h-56 max-h-96 min-w-56 max-w-96">
            <div className="card-title">Monthly chart</div>
            <Line data={data} />
        </div>
    );
};
