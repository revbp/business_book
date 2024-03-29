const express = require("express");
const router = express.Router();

const db = require("../models");
const auth = require("../authenticate");

router
  .route("/")
  .get(auth, async (req, res, next) => {
    try {
      const sales = await db.Sale.findAll({
        attributes: ["id", "description", "amount", "saleDate", "imageUrl"],
        include: [{ model: db.Customer }],
        where: {
          userId: req.user.id,
        },
      });
      res.json(sales);
    } catch (error) {
      res.status(500).send({
        error: error.toString(),
      });
    }
  })
  .post(auth, async (req, res, next) => {
    try {
      const sale = await db.Sale.create({
        description: req.body.description,
        amount: parseFloat(req.body.amount),
        saleDate: req.body.saleDate,
        customerId: req.body.customerId,
        userId: req.user.id,
        imageUrl: req.body.imageUrl,
      });
      res.json(sale);
    } catch (error) {
      res.status(500).send({
        error: error.toString(),
      });
    }
  });

router
  .route("/:saleId")
  .get(auth, async (req, res, next) => {
    try {
      const sales = await db.Sale.findAll({
        attributes: ["id", "description", "amount", "saleDate", "imageUrl"],
        include: [{ model: db.Customer }],
        where: {
          id: req.params.saleId,
        },
      });
      res.json(sales[0]);
    } catch (error) {
      res.status(500).send({
        error: error.toString(),
      });
    }
  })
  .delete(auth, async (req, res, next) => {
    try {
      const isDeleted = await db.Sale.destroy({
        where: { id: req.params.saleId },
      });
      res.json({
        isDeleted: Boolean(isDeleted),
      });
    } catch (error) {
      res.status(500).send({
        error,
      });
    }
  });

module.exports = router;
