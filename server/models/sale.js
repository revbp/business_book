"use strict";
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    "Sale",
    {
      description: DataTypes.TEXT,
      amount: DataTypes.FLOAT,
      saleDate: DataTypes.DATEONLY,
      imageUrl: DataTypes.STRING,
    },
    {}
  );
  Sale.associate = function (models) {
    Sale.belongsTo(models.Customer, {
      foreignKey: "customerId",
    });
    Sale.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  return Sale;
};
