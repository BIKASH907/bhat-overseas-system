import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) global.mongooseCache = cache;

export async function dbConnect(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) {
    // No DB configured — caller will fall back to seed data
    return null;
  }
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }
  try {
    cache.conn = await cache.promise;
  } catch (err) {
    cache.promise = null;
    throw err;
  }
  return cache.conn;
}

export function isDbConfigured(): boolean {
  return Boolean(MONGODB_URI);
}
