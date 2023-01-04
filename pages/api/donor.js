import clientPromise from "../../lib/mongodb";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  switch (req.method) {
    case "POST":
        let bodyObject = JSON.parse(req.body);
        let myPost = await db.collection("donors").insertOne(bodyObject);
        res.json(myPost.ops);
       break;
    case "GET":
      const donations = await db.collection("donors").find({}).toArray();
      res.json({ status: 200, data: donations });
      break;
    case "DELETE":
      let bodyObject1 = req.body;
      let newobj = await db.collection("donors").deleteOne({_id: new ObjectId(bodyObject1.id)});
      res.json(newobj);
      break;
      case "PUT":
        let bodyObject2 = JSON.parse(req.body);
        const { Email, Phone, Address, City, State, Country, Zipcode  } = bodyObject2;
        let newobj1 = await db.collection("donors").updateOne(
          {
            _id: new ObjectId(bodyObject2.id)
          },{ $set: { Email: Email, Phone: Phone, Address: Address, City: City, State: State, Country: Country, Zipcode: Zipcode }}
        );
        res.json(newobj1);
        break;
  }
}