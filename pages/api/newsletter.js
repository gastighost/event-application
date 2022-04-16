import { MongoClient } from "mongodb";

async function connectToDatabase() {
  const uri =
    "mongodb+srv://gaston-roxas:Coder12345@cluster0.oq0dy.mongodb.net/events?retryWrites=true&w=majority";

  const client = new MongoClient(uri);
  return client;
}

async function insertDocument(client, document) {
  await client.connect();

  await client.db().collection("emails").insertOne(document);
}

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }
    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
