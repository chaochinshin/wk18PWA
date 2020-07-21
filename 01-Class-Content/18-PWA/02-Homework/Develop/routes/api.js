//loads the express router modules and transactions model
const router = require("express").Router();
const Transaction = require("../models/transaction.js");
//when a post request is made to api transaction, it creates a transaction and return it as json
router.post("/api/transaction", ({body}, res) => {
  Transaction.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

//when a post request is made to api transaction, it creates many transactions and returns as json
router.post("/api/transaction/bulk", ({body}, res) => {
  Transaction.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});
//when a get request is made to api transaction, it sorts transactions by dates and returns as json
router.get("/api/transaction", (req, res) => {
  Transaction.find({}).sort({date: -1})
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});
//export router to other files
module.exports = router;