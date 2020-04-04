var express = require("express");
var router = express.Router();

var db = require("../models");
const auth = require("../authenticate");

router
  .route("/")
  .get(auth, async (req, res, next) => {
    try {
      const customers = await db.Customer.findAll({
        attributes: ["id", "name", "contact"],
        where: {
          userId: req.user.id,
        },
      });
      res.json(customers);
    } catch (error) {
      res.status(500).send({
        error: error.toString(),
      });
    }
  })
  .post(auth, async (req, res, next) => {
    try {
      const customer = await db.Customer.create({
        name: req.body.name,
        contact: req.body.contact,
        userId: req.user.id,
      });
      res.json(customer);
    } catch (error) {
      res.status(500).send({
        error: error.toString(),
      });
    }
  });

module.exports = router;
