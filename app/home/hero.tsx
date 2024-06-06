import React from "react";

export const Hero = () => {
    return (
        <section>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">
                            Enter the task arena
                        </h1>
                        <p className="py-6">
                            Simplify the gym logging process using this
                            application. Suited for people who have a strict gym
                            schedule.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </section>
    );
};
