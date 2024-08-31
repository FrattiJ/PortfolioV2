require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

console.log('Environment Variables:', process.env);

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in the environment');
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await client.close();
  }
}

testConnection();
