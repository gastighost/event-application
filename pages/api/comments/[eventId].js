import { MongoClient } from "mongodb";
const uri =
  "mongodb+srv://gaston-roxas:Coder12345@cluster0.oq0dy.mongodb.net/events?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    await client.connect();

    const result = await client
      .db()
      .collection("comments")
      .insertOne(newComment);

    newComment.id = result.insertedId;
    console.log(result);

    res.status(201).json({
      message: "Added comment!",
      comments: newComment,
    });
  }
  if (req.method === "GET") {
    await client.connect();

    const documents = await client
      .db()
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }
  client.close();
}

export default handler;
