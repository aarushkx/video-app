import React from "react";
import LogoutButton from "@/components/LogoutButton";

const Feed = () => {
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
            <LogoutButton />
            <h1 className="text-2xl font-semibold">Feed</h1>
        </div>
    );
};

export default Feed;
