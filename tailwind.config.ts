import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#881337",

                    secondary: "#44403c",

                    accent: "#9333ea",

                    neutral: "#1c1917",

                    "base-100": "#f3f4f6",

                    info: "#34d399",

                    success: "#22d3ee",

                    warning: "#ffc400",

                    error: "#e11d48",
                },
            },
            "pastel", "light"
        ],
    },
    plugins: [require("daisyui")],
};
export default config;
