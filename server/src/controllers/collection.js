const { collection, user } = require("../../models");

exports.getCollection = async (req, res) => {
  try {
    const { id } = req.params;

    // const id = req.user.id;

    const dataCollection = await collection.findAll({
      where: {
        userId: id,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
    });

    res.send({
      status: "success",
      collection: dataCollection,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addCollection = async (req, res) => {
  try {
    const { id } = req.params;

    const newData = req.body;

    const newCollectin = await collection.create({
      ...newData,
      // id from token
      userId: id,
    });

    const dataCollection = await collection.findOne({
      where: {
        id: newCollectin.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
    });

    res.send({
      status: "success...",
      collection: dataCollection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateCollection = async (req, res) => {
  try {
    const { id } = req.params;

    const data = req.body;

    await collection.update(data, {
      where: {
        id,
      },
    });

    const dataCollection = await collection.findOne({
      where: {
        id,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "user"],
      },
    });

    res.send({
      status: "success",
      message: `Update product id: ${id} finished`,
      collection: dataCollection,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;

    await collection.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete Collection id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
