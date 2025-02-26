"use client";

import React from "react";
import VideoUploadForm from "@/components/VideoUploadForm";

const VideoUploadPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Upload New Video</h1>
                <VideoUploadForm />
            </div>
        </div>
    );
};

export default VideoUploadPage;
