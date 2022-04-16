import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  return client;
}

export async function insertDocument(client, collection, document) {
  await client.connect();
  const result = client.db().collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  await client.connect();
  const documents = await client
    .db()
    .collection(collection)
    .find({})
    .sort({ _id: sort })
    .toArray();
  return documents;
}
