const user = require("../models/users");
const User = require("../models/users");

// usado la sintaxis como crete usando la exportacion de un  objeto y dentro una funcion y asi exportarlo

module.exports = {
  //! sintaxis key: value
  // =========================get all ==============
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
};
