/* eslint-disable react/no-unescaped-entities */
'use client'

import Link from "next/link";
import React from "react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { QueryResult, sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { fetchPassword, fetchUserId, fetchUserName } from "@/app/api/backend/db";

export default function Page() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    /* TODO: add authentication */
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (typeof email !== "string" || typeof password !== "string") {
            setErrorMessage("Invalid email or password");
            return;
        }

        //console.log(email);
        const pass = await fetchPassword(email);
        
        if (pass.length === 0 || pass == "-1") {
            setErrorMessage("Invalid Email or Password");
            return;
        }

        if (password === pass) {
            const id = await fetchUserId(email);
            console.log("Login successful:", id, email);
            router.push(`/${id}/dashboard`); //push to user's dashboard
        } else {
            console.log("Unsuccessful login");
            setErrorMessage("Invalid email or password");
        }
        
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-col">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <h1>{errorMessage}</h1>
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
                            <label className="label">
                                {" "}
                                {/* Not yet implemented */}
                                <a
                                    href="#"
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
                <div className="text-center">
                    <Link href={"/register"} className="link text-sm">
                        Don't have an account?
                    </Link>
                </div>
            </div>
        </div>
    );
};