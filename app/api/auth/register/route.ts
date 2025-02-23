import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/user.model";

export const POST = async (request: NextRequest) => {
    try {
        const { email, username, password } = await request.json();

        const missingField = !email
            ? "Email"
            : !username
            ? "Username"
            : !password
            ? "Password"
            : null;
        if (missingField) {
            return NextResponse.json(
                { message: `${missingField} is required` },
                { status: 400 }
            );
        }

        await dbConnect();

        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (user) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        await User.create({ email, password });

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to register user" },
            { status: 500 }
        );
    }
};
