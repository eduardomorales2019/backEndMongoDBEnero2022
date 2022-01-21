const user = require("../models/users");

// usado la sintaxis como crete usando la exportacion de un  objeto y dentro una funcion y asi exportarlo

module.exports = {
  //! sintaxis key: value
  // =========================get all ==============
  findAll: (req, res) => {
    res.status(201).json({ message: "all user created", users: [] });
  },
  // =========================POST===========================
  create: (req, res) => {
    res.status(201).json({
      message: "user created",
      user: { name: "Eduardo", email: "eduardo@inmo-puebla.com", age: 40 },
    });
  },
};
