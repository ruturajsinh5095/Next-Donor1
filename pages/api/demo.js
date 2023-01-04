import clientPromise from "../../lib/mongodb";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  switch (req.method) {
    case "POST":
        let bodyObject = JSON.parse(req.body);
        let myPost = await db.collection("domo").insertOne(bodyObject);
        res.json(myPost.ops);
       break;
  }
}