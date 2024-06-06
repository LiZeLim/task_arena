"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const NavBar = () => {
    const pathName = usePathname();
    const isHomePage = pathName === "/";

    return (
        <header>
            <nav>
                <div className="navbar bg-base-100">
                    <div className="flex-1">
                        <Link href={"/"} className="btn btn-ghost text-xl">
                            TaskArena
                        </Link>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <Link href={"/login"}>Login</Link>
                            </li>
                            {/* <li>
                                <details>
                                    <summary>Parent</summary>
                                    <ul className="p-2 bg-base-100 rounded-t-none">
                                        <li>
                                            <a>Link 1</a>
                                        </li>
                                        <li>
                                            <a>Link 2</a>
                                        </li>
                                    </ul>
                                </details>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};
