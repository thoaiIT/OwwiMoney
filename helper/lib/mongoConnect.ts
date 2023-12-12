import { Db, MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL || '';

let client: MongoClient;
let database: Db;

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    database = client.db('MainDatabase');
  }

  return database;
};

export { connectToDatabase };
