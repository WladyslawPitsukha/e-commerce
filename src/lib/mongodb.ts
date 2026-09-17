import "server-only";
import mongoose from "mongoose";

const connectionUri = process.env.MONGODB_URI;

type MongooseCache = {
    connection: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
    mongooseConnection?: MongooseCache;
};

const cached = globalWithMongoose.mongooseConnection ?? {
    connection: null,
    promise: null,
};

globalWithMongoose.mongooseConnection = cached;

export async function connectToDatabase() {
    if (!connectionUri) {
        throw new Error("Database is not configured. Set MONGODB_URI before using database routes.");
    }

    if (cached.connection) {
        return cached.connection;
    }

    cached.promise ??= (async () => {
        let lastError: unknown;
        for (let attempt = 0; attempt < 3; attempt += 1) {
            try {
                return await mongoose.connect(connectionUri, {
                    bufferCommands: false,
                    serverSelectionTimeoutMS: 5000,
                    connectTimeoutMS: 5000,
                    socketTimeoutMS: 10000,
                    maxPoolSize: 10,
                });
            } catch (error) {
                lastError = error;
                if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
            }
        }
        throw lastError;
    })();

    try {
        cached.connection = await cached.promise;
        return cached.connection;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
}