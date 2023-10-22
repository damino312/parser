const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const CryptoRoutes = require("./Crypto.routes");

const mongoPort = process.env.MONGO_PORT || 27017;
const mongoLink = process.env.MONGO_HOST || "localhost";

const port = process.env.EXPRESS_PORT || 4000;
const origin = process.env.ORIGIN || "http://localhost:5173";

app.use(
  cors({
    credentials: true,
    origin: origin,
  })
);

app.use(express.json());
app.use(CryptoRoutes);

app.listen(port, () => console.log("Server is working"));
mongoose
  .connect(`mongodb://${mongoLink}:${mongoPort}/crypto`) // change for docker
  .then(() => console.log("MongoDB has been connected"));
