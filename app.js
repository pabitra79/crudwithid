require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const Dbconnection = require("./app/config/dbConnect");
Dbconnection();

// postman
const userRouter = require("./app/route/allroute");
app.use(userRouter);

app.listen(3010, () => {
  console.log("server port is 3010");
});
