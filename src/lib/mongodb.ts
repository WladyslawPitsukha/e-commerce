import mongoose from "mongoose";

const connectionUri = process.env.MONGODB_URI;

if (!connectionUri) {
    throw new Error("MONGODB_URI must be defined in the environment.");
}

declare global {
    var mongooseConnection: {
        connection: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    } | undefined;
}

const cached = global.mongooseConnection ?? {
    connection: null,
    promise: null,
};

global.mongooseConnection = cached;

export async function connectToDatabase() {
    if (cached.connection) {
        return cached.connection;
    }

    cached.promise ??= mongoose.connect(connectionUri, {
        bufferCommands: false,
    });

    cached.connection = await cached.promise;
    return cached.connection;
}