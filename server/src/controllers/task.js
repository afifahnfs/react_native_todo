const { task, collection, user } = require("../../models");

exports.getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const dataTask = await task.findAll({
      where: {
        collectionId: id,
      },

      include: {
        model: collection,
        as: "collection",
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId"],
        },

        include: {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      },

      attributes: {
        exclude: ["createdAt", "updatedAt", "collectionId"],
      },
    });

    res.send({
      status: "success",
      task: dataTask,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = req.body;
    console.log(data);

    const newTask = await task.create({
      ...data,
      collectionId: id,
    });

    const dataTask = await task.findOne({
      where: {
        id: newTask.id,
      },

      include: {
        model: collection,
        as: "collection",
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId"],
        },

        include: {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      },

      attributes: {
        exclude: ["createdAt", "updatedAt", "collectionId"],
      },
    });

    res.send({
      status: "success...",
      task: dataTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const data = req.body;

    await task.update(data, {
      where: {
        id,
      },
    });

    const dataTask = await task.findOne({
      where: {
        id,
      },

      include: {
        model: collection,
        as: "collection",
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId"],
        },

        include: {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      },

      attributes: {
        exclude: ["createdAt", "updatedAt", "collectionId"],
      },
    });

    res.send({
      status: "success",
      message: `Update product id: ${id} finished`,
      task: dataTask,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await task.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete Task id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
