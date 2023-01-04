import clientPromise from "../../lib/mongodb";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  switch (req.method) {
    case "POST":
        let bodyObject = JSON.parse(req.body);
        let myPost = await db.collection("donations").insertOne(bodyObject);
        res.json(myPost.ops);
       break;
    case "GET":
      const donations = await db.collection("donations").find({}).toArray();
      res.json({ status: 200, data: donations });
      break;
    case "DELETE":
      let bodyObject1 = JSON.parse(req.body);
      let newobj = await db.collection("donations").deleteOne({_id: new ObjectId(bodyObject1.id)});
      res.json(newobj);
      break;
    case "PUT":
      let bodyObject2 = JSON.parse(req.body);
      const { donor, amount, type, fund, status1, date } = bodyObject2;
      let newobj1 = await db.collection("donations").updateOne(
        {
          _id: new ObjectId(bodyObject2.id)
        },{ $set: { Donor: donor, Amount: amount, Type: type, Fund: fund, Status1: status1, Date: date }}
      );
      res.json(newobj1);
      break;
  }
}