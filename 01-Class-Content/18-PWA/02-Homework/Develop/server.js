//line 2 to 4 are to pull node modules into the code
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

//set up at local host 3000
const PORT = 3000;

//activate express modules
const app = express();

//tell logger to log in dev
app.use(logger("dev"));

//use middleware to compress data or requests
app.use(compression());
//using urlencoded to extend express to use JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//allow files from the public folder to be accessed
app.use(express.static("public"));
//use mongodb database to localhost/budget
mongoose.connect("mongodb://localhost/budget", {
  //use new url parser is true; don't use old url parser because it is deprecated
  useNewUrlParser: true,
  //don't use findandmodify; use findoneandupdate instead
  useFindAndModify: false
});

// use routes in file path provided
app.use(require("./routes/api.js"));
// tells the express app to listen at that port for request
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});