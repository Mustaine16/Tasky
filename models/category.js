"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "title cannot be empty" },
          notNull: { args: true, msg: "title cannot be null" },
        },
      },
    },
    {
      freezeTableName: true,
      tableName: "categories",
    }
  );
  Category.associate = function (models) {
    Category.hasMany(models.dashboard, {as:"dashboards"})
  };
  return Category;
};
