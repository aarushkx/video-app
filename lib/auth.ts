import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "./db";
import User, { IUser } from "@/models/user.model";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier: { label: "Email or Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<any> {
                if (!credentials?.identifier || !credentials.password) {
                    throw new Error("Email/Username and password are required");
                }

                try {
                    await dbConnect();

                    const user = await User.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier },
                        ],
                    });

                    if (!user) {
                        throw new Error("User not found");
                    }

                    const isPasswordCorrect = await bcrypt.compare(
                        credentials?.password ?? "",
                        user.password
                    );

                    if (!isPasswordCorrect) {
                        throw new Error("Incorrect password");
                    }

                    return {
                        _id: user._id as string,
                        email: user.email,
                        username: user.username,
                    };
                } catch (error: any) {
                    throw new Error("Failed to authenticate user");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user?: IUser | any }) {
            if (user) {
                token._id = user._id as string;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user._id = token._id as string;
                session.user.username = token.username as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
};
