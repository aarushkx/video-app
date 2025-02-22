import mongoose from "mongoose";

const MONGDB_URI = process.env.MONGODB_URI!;

if (!MONGDB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
        };

        cached.promise = mongoose.connect(MONGDB_URI, opts).then(() => {
            return mongoose.connection;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw new Error("Failed to connect to MongoDB");
    }

    return cached.conn;
}
