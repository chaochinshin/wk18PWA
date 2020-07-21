//import mongoose modules
const mongoose = require("mongoose");
//use the schema object from mongoose modules
const Schema = mongoose.Schema;
//make a schema for transactions
const transactionSchema = new Schema(
  {//name property type is a string, no transactions can be made without it
    name: {
      type: String,
      trim: true,
      required: "Enter a name for transaction"
    },
    //property contains a number and also required
    value: {
      type: Number,
      required: "Enter an amount"
    },
    //property contains date with auto default date saved when transactions entered
    date: {
      type: Date,
      default: Date.now
    }
  }
);
//create a mongoose model with schema (schema created from javascripts) and model interacts with database
const Transaction = mongoose.model("Transaction", transactionSchema);
//export the transaction model
module.exports = Transaction;
