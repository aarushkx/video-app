import axios from "axios";
import { IVideo } from "@/models/video.model";

export type VideoFormData = Omit<IVideo, "_id">;

class ApiClient {
    private axiosInstance = axios.create({
        baseURL: "/api",
        headers: {
            "Content-Type": "application/json",
        },
    });

    private async request<T>(
        method: string,
        endpoint: string,
        data?: any
    ): Promise<T> {
        try {
            const response = await this.axiosInstance.request<T>({
                method,
                url: endpoint,
                data,
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    error.response?.data.message || "Something went wrong"
                );
            }
            throw new Error("Something went wrong");
        }
    }

    async getVideos(): Promise<IVideo[]> {
        return this.request<IVideo[]>("GET", "/videos");
    }

    async getVideo(id: string): Promise<IVideo> {
        return this.request<IVideo>("GET", `/videos/${id}`);
    }

    async createVideo(videoData: VideoFormData): Promise<IVideo> {
        return this.request<IVideo>("POST", "/videos", videoData);
    }

    // LATER ON
    // async deleteVideo(id: string): Promise<void> {
    //     return this.request<void>("DELETE", `/videos/${id}`);
    // }
}

export const apiClient = new ApiClient();
