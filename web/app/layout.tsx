import { UserContextWP } from "@/context/UserContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LawGpt || Be your own lawyer.",
    description:
        "It helps you to know laws that can help you resolve your condition",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <UserContextWP >
                    {children}
                </UserContextWP>
            </body>
        </html>
    );
}
