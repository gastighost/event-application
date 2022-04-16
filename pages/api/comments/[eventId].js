import { MongoClient } from "mongodb";
import {
  connectToDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

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

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed" });
      return;
    }

    newComment.id = result.insertedId;
    console.log(result);

    res.status(201).json({
      message: "Added comment!",
      comments: newComment,
    });
  }
  if (req.method === "GET") {
    let documents;
    try {
      documents = await getAllDocuments(client, "comments", 1);
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting documents failed" });
      return;
    }
  }
  client.close();
}

export default handler;
