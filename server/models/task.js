"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      task.belongsTo(models.collection, {
        as: "collection",
        foreignKey: {
          name: "collectionId",
        },
      });
    }
  }
  task.init(
    {
      name: DataTypes.STRING,
      isDone: DataTypes.ENUM("done", "not done"),
      collectionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "task",
    }
  );
  return task;
};
