import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedClient = null;
let cachedDb = null;

async function connectMongo() {
  if (cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedClient = client;
    cachedDb = client.connection.db;
    return { client, db: cachedDb };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default connectMongo;
