import { QueryResultRow } from '@vercel/postgres';
import React from 'react'

export const WorkoutsTable = ({ workouts }: { workouts: QueryResultRow[] }) => {
    console.log(workouts);

    return (
        <div className="">
            <h1 className="card-title">Recent Workouts</h1>
            <div className="overflow-x-auto h-96">
                <table className="table table-pin-rows table-pin-cols">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Workout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.map((row, index) => {
                            const dateStr: String =
                                row.workout_date instanceof Date
                                    ? row.workout_date.toLocaleDateString()
                                    : row.workout_date;

                            return (
                                <tr key={index + 1}>
                                    <th>{index + 1}</th>
                                    <td>{dateStr}</td>
                                    <td>{row.target_muscles}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
