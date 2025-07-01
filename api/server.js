import { MongoClient } from "mongodb";

let cachedClient = null;

export default async function handler(req, res) {
  if (!cachedClient) {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    cachedClient = client;
  }

  const db = cachedClient.db("your_db_name");
  const collection = db.collection("your_collection");

  const data = await collection.find({}).toArray();
  res.status(200).json(data);
}
