/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { checkEmail, addUser, fetchUserId } from "@/app/api/backend/db";

const Page = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name: string = formData.get("name") as string;
        const email: string = formData.get("email") as string;
        const password: string = formData.get("password") as string;
        const workoutGoal: string = formData.get("workoutGoal") as string;

        console.log(name, email, password, workoutGoal);

        //TODO check if email is valid -> in the system already, workoutGoal shouldn't be < 1
        const containsEmail: boolean = await checkEmail(email);
        if (containsEmail) {
            setErrorMessage("Please enter a different email");
            return
        }

        const addedUser: boolean = await addUser(name, email, password, workoutGoal);
        if (!addedUser) {
            console.log("Please check uuid");
            setErrorMessage("Error creating new account");
        } else {
            const id = await fetchUserId(email);
            router.push(`/${id}/dashboard`);
        }
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left max-w-96">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">
                            Start Your Fitness Journey Today: Track Your
                            Progress, Achieve Your Goals
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <h1>{errorMessage}</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="name"
                                    name="name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Weekly Workout Goal
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="workoutGoal"
                                    name="workoutGoal"
                                    className="input input-bordered"
                                    min="1"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
