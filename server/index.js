const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const playerCollection = client.db("playerDB").collection("players");

    // Get all players
    app.get("/api/players", async (req, res) => {
      try {
        const cursor = playerCollection.find();
        const players = await cursor.toArray();
        res.status(200).json({ status: "success", data: players });
      } catch (error) {
        console.log("[PLAYERS_GET]", error);
        res.status(500).json({
          status: "error",
          message: "Internal error",
        });
      }
    });

    // Get player by ID
    app.get("/api/players/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const player = await playerCollection.findOne(query);
        res.status(200).json({
          status: "success",
          data: player,
        });
      } catch (error) {
        console.log("[PLAYER_GET]", error);
        res.status(500).json({
          status: "error",
          message: "Internal error",
        });
      }
    });

    // Create a new player
    app.post("/api/players", async (req, res) => {
      try {
        const newPlayer = req.body;
        const { name, age, team, position } = newPlayer;

        if (!name || !age || !team || !position)
          return res.status(400).json({
            status: "error",
            message: "Missing required fields",
          });

        if (age < 1)
          return res.status(400).json({
            status: "error",
            message: "Please provide valid age",
          });

        const player = await playerCollection.insertOne(newPlayer);

        res.status(200).json({
          status: "success",
          data: player,
        });
      } catch (error) {
        console.log("[PLAYER_POST]", error);
        res.status(500).json({
          status: "error",
          message: "Internal error",
        });
      }
    });

    // Update player by ID
    app.patch("/api/players/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const data = req.body;

        const filter = { _id: new ObjectId(id) };
        const update = { $set: data };
        const options = { upsert: false };

        const updatedPlayer = await playerCollection.updateOne(
          filter,
          update,
          options
        );

        res.status(200).json({
          status: "success",
          data: updatedPlayer,
        });
      } catch (error) {
        console.log("[PLAYER_PATCH]", error);
        res.status(500).json({
          status: "error",
          message: "Internal error",
        });
      }
    });

    // Delete player by ID
    app.delete("/api/players/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };

        const result = await playerCollection.deleteOne(filter);
        res.status(200).json({
          status: "success",
          message: "Player deleted",
        });
      } catch (error) {
        console.log("[PLAYER_DELETE]", error);
        res.status(500).json({
          status: "error",
          message: "Internal error",
        });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("playerDB").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Player management API is running");
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
