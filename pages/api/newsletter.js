import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://gaston-roxas:Coder12345@cluster0.oq0dy.mongodb.net/newsletter?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    await client.connect();

    await client.db().collection("emails").insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
