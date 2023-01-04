import clientPromise from "../../lib/mongodb";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  switch (req.method) {
    case "POST":
        let bodyObject = JSON.parse(req.body);
        let myPost = await db.collection("donations").find({_id: new ObjectId(bodyObject.id1)}).toArray();
        // let myPost1 = await db.collection("donors").find({_id: new ObjectId(bodyObject.Donor_id),}).toArray();
        res.json(myPost);
       break;
  }
}