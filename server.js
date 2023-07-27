//import libraries

const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const moongoose = require("mongoose");
var routes = require("./routes/routes");
const cors = require("cors");

//start server

app.use(cors({ origin: "http://localhost:4200" }));

app.listen(4000, function check(error) {
  if (error) {
    console.log("Server error");
  } else {
    console.log("Server Started");
  }
});

//connect to mongo database
mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb://127.0.0.1:27017/incident",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function checkMongoDBConnection(error) {
    if (error) {
      console.log("mongo DB error");
    } else {
      console.log("Mongo DB Connected");
    }
  }
);

app.use(express.json());
app.use(routes);
