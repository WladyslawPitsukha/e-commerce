import mongoose from "mongoose";

const connectionUri = process.env.MONGODB_URI;

if (!connectionUri) {
    throw new Error("MONGODB_URI must be defined in the environment.");
}

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
    if (cached.connection) {
        return cached.connection;
    }

    cached.promise ??= mongoose.connect(connectionUri!, {
        bufferCommands: false,
    });

    cached.connection = await cached.promise;
    return cached.connection;
}