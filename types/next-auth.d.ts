import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        _id?: string;
        username?: string;
    }

    interface Session {
        user: {
            _id?: string;
            username?: string;
        } & DefaultSession["user"];
    }
}
