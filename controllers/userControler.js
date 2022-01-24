const User = require("../models/users");

// usado la sintaxis como crete usando la exportacion de un  objeto y dentro una funcion y asi exportarlo

module.exports = {
  //! sintaxis key: value
  // =========================find all ==============
  findAll: async (req, res) => {
    try {
      const allUsers = await User.find();
      res.status(200).json(allUsers);
    } catch (error) {
      {
        res.status(500).json({ message: "Error al obtener los usuarios" });
      }
    }
  },
  // =========================POST===========================
  //! se crea una nueva instancia de la coleccion de mongo, que ya esta definida en el modelo por defecto
  create: async (req, res) => {
    try {
      // console.log("Body", req.body);
      const newUser = await User.create(req.body);
      res.status(201).json({ message: "user created", user: newUser });
    } catch (err) {
      res.status(400).json({ message: "error creatig user ", error: err });
    }
  },
  // ========================find one by id  ============================
  findByID: async (req, res) => {
    const { id } = req.params;
    console.log(id, "id in paramas ");
    try {
      const userFound = await User.findById(id);
      if (!userFound) {
        // en lugar que sea === null
        res.status(404).json({
          message: "User no encontrado por el sistema ",
          user: userFound,
        });
      } else {
        res.status(200).json({ message: "User encontrado", user: userFound });
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Error user not found, error", error: err });
    }
  },
  // ========================Delete by id ============================
  deleteById: async (req, res) => {
    try {
      const { id } = req.params.id;
      const user = await User.findByIdAndDelete(id);
      res.status(200).json({ message: "user deleted", user });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al eliminar el usuario", error: err });
    }
  },
  // ========================Update by id ============================
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.updateOne(id, req.body, {
        new: true,
      });
      res.status(200).json({ message: "user updated", user });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al actualizar el usuario", error: err });
    }
  },
  // ========================patch ============================
  upDateOnebyID: async (req, res) => {
    try {
      const { id } = req.params;
      const userUpDate = await User.findByIdAndUpdate(id, req.body); //! SIEMPRE HAY QUE MANDAR EL BODY EN  UPDATE DE UN PATCH O PUT
      res.status(200).json({ message: "user updated", userUpDate });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al actualizar el usuario", error: err });
    }
  },
};
