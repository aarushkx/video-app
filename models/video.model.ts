import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920,
};

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls?: boolean;
    transformation?: {
        width: number;
        height: number;
        quality: number;
    };
}

const videoSchema = new Schema<IVideo>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        thumbnailUrl: {
            type: String,
            required: true,
        },
        controls: {
            type: Boolean,
            default: true,
        },
        transformation: {
            width: {
                type: Number,
                default: VIDEO_DIMENSIONS.width,
            },
            height: {
                type: Number,
                default: VIDEO_DIMENSIONS.height,
            },
            quality: {
                type: Number,
                min: 1,
                max: 100,
            },
        },
    },
    { timestamps: true }
);

const Video = models?.Video || model<IVideo>("Video", videoSchema);

export default Video;
