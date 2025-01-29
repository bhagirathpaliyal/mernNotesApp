const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const noteRoutes = require("./routes/notesRoutes");


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  console.log("runnnig /");
  res.send("MERN Notes App Backend Running");
});

app.use('/api/notes', noteRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) =>
    app.listen(PORT, () =>
      console.log(
        `Server running on port ${PORT} , mongoDb connected : ${conn.connection.host}`
      )
    )
  )
  .catch((err) => console.log("MongoDB connection error:", err));
