import React from "react";
import Header from "@/components/Header";
// import LogoutButton from "@/components/LogoutButton";

const Feed = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col gap-4 items-center justify-center h-screen">
                {/* <LogoutButton /> */}
                {/* <Header /> */}
                <h1 className="text-2xl font-semibold mb-80">Feed</h1>
            </div>
        </>
    );
};

export default Feed;
