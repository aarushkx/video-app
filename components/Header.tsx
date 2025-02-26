"use client";

import React, { useState } from "react";
import LogoutButton from "./LogoutButton";
import { APP_NAME } from "@/constants";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

const NAV_LINKS = [
    { href: "/profile", label: "Profile" },
    { href: "/upload", label: "Upload" },
];

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* App Name */}
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    {APP_NAME}
                </Link>

                {/* Dropdown Menu */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-2 focus:outline-none"
                    >
                        {/* User Avatar or Icon */}
                        {session?.user?.image ? (
                            <img
                                src={session.user.image}
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <Image
                                    src="https://www.svgrepo.com/show/43426/profile.svg"
                                    alt="Profile"
                                    width={32}
                                    height={32}
                                />
                            </div>
                        )}
                    </button>

                    {/* Dropdown Content */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                            {NAV_LINKS.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    {label}
                                </Link>
                            ))}
                            <div className="border-t border-gray-200"></div>
                            <LogoutButton />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
