/** @format */

const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
var fs = require("fs");
var http = require("http");
var https = require("https");

env.config();

app.use(express.json());
app.use(cors());

app.use("/Images", express.static(path.join(__dirname, "Public")));
app.use(require("./Route/LoginRoute"));

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
	console.log("Database Connected");
});

mongoose.connection.on("error", (err) => {
	console.log("Connection Error", err);
});

var httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 5005, () => {
	console.log(`Server is running on port ${process.env.PORT || 5005}`);
});

app.get("/", (req, res) => {
	res.send("Now You Can Start !!!!");
});
