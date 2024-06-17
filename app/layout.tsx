import type { Metadata } from "next";
import { Inter, Radio_Canada } from "next/font/google";
import "@/app/globals.css";
import { NavBar } from "@/app/components/navbar";
import { Footer } from "@/app/components/footer";

const inter = Inter({ subsets: ["latin"] });
const radio_canada = Radio_Canada({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Repeat Gym",
    description: "Simplified gym tracking application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="">
            <body className={radio_canada.className}>
                <NavBar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
