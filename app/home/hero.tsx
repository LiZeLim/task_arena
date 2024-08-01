/* eslint-disable react/no-unescaped-entities */

import React from "react";

export const Hero = () => {
    return (
        <section>
            <div className="hero min-h-screen">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-8xl font-bold">
                            Enter the Task Arena
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
            <div className="min-h-screen bg-base-200 text-center p-12">
                <h1 className="text-4xl font-bold py-8">What is TaskArena</h1>
                <p className="py-4">
                    Your ultimate workout companion. Track your progress
                    effortlessly and achieve your fitness goals with ease!
                </p>
                <h2 className="text-3xl font-bold py-2">Feature Highlights</h2>
                <h3 className="text-2xl py-1">Simple & Intuitive</h3>
                <p>
                    TaskArena makes tracking your workouts a breeze. No
                    complicated setups, just straightforward logging.
                </p>
                <h3 className="text-2xl py-1">View Progress</h3>
                <p>
                    See your improvements over time. TaskArena provides detailed
                    stats to keep you motivated.
                </p>
                <h3 className="text-2xl py-1">Set Goals</h3>
                <p>
                    Set new fitness goals and watch yourself achieve them.
                    TaskArena helps you stay on target.
                </p>
                <div className="test-2xl py-4">
                    <p>
                        This is a personal project of mine aimed at learning and
                        developing skills in full-stack application development.
                        While I'm still gaining experience in developing React
                        applications, I'm working to deepen my understanding of
                        both front-end and back-end technologies. I aim to
                        enhance my skills in TypeScript, React, and Node.js.
                        Additionally, designing and implementing the database
                        with PostgreSQL has further deepened my knowledge of
                        data modelling and management.
                    </p>
                </div>
            </div>
        </section>
    );
};
