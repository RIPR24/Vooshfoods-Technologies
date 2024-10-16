const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const cardRouter = require("./routes/Cardroute");

const db = mongoose.connect(process.env.API_URI);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("this runs");
});

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/card", cardRouter);
