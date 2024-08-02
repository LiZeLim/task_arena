import React from "react";
import Link from "next/link";

export const Footer = () => {
    return (
        <section>
            <footer className="footer footer-center bg-base-400 text-base-content rounded p-10">
                <nav className="grid grid-flow-col gap-4">
                    <a
                        href="https://www.linkedin.com/in/lizelim/"
                        target="_blank"
                        rel="noopener"
                        className="link link-hover"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/LiZeLim"
                        target="_blank"
                        rel="noopener"
                        className="link link-hover"
                    >
                        GitHub
                    </a>
                    <p>Email: lizelim995@gmail.com</p>
                </nav>
            </footer>
        </section>
    );
};
