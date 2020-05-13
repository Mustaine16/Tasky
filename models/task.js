export default (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "task",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "title cannot be empty" },
          notNull: { args: true, msg: "title cannot be null" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "description cannot be empty" },
          notNull: { args: true, msg: "description cannot be null" },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Category cannot be empty" },
          notNull: { args: true, msg: "Category cannot be null" },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "userId cannot be empty" },
          notNull: { args: true, msg: "userId cannot be null" },
        },
      },
    },
    {
      tableName: "tasks",
    }
  );
  Task.associate = function (models) {

    Task.belongsTo(models.user, {
      as: "user",
      foreignKey: "userId",
    });

    Task.belongsTo(models.category, {
      as: "category",
      foreignKey: "categoryId",
    });
  };
  return Task;
};
