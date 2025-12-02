import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const app = express();

app.use(express.json());
app.use(cors());

app.get("/todos", async (req, res) => {
  res.json(
    [
      {
        text: "entry 1",
        done: true,
        id: 1
      },
      {
        text: "entry 2",
        done: false,
        id: 2
      }
    ]
  );
  try {
    // Connect the client to the server	(optional starting in v4.7)
    console.log("db!!!");
    await client.connect();
    const db = await client.db("sample_mflix");
    const todoCollection = db.collection("todos");
    let todosFromCollection = await todoCollection.find({});
    console.log(todosFromCollection.toArray());
    res.json(todosFromCollection);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

app.listen(3000);


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = await client.db("sample_mflix");
    const commentsCollection = db.collection("comments");

    // await flix.updateOne(
    //     { title: "My Movie" },
    //     { $inc: { year: 100000 } 
    // });

    // Add something
    await commentsCollection.insertOne({
      name: "Mike"
    });

    // Finding
    // let mike = await commentsCollection.findOne({name: "Mike"});




  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);