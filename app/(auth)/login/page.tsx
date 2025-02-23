"use client";

import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });

    const { identifier, password } = formData;

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        const response = await signIn("credentials", {
            identifier,
            password,
            redirect: false,
        });

        if (response?.error) {
            setError(response.error);
            setLoading(false);
        } else {
            setLoading(false);
            setFormData({
                identifier: "",
                password: "",
            });
            router.push("/");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="identifier"
                    placeholder="Email or Username"
                    value={identifier}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p>
                    Don&apos;t have an account?{" "}
                    <Link href="/register">Register</Link>
                </p>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Login;
