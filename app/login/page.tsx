/* eslint-disable react/no-unescaped-entities */
'use client'

import Link from "next/link";
import React from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import clientPromise from "../lib/db";

export default function Page() {
    const router = useRouter();

    /* TODO: add authentication */
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        /* const response = await fetch("@/app/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        }); */
        const response = {ok: true};

        if (response.ok) {
            router.push("/"); //push to user's dashboard
        } else {
            // Handle errors
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-col">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
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