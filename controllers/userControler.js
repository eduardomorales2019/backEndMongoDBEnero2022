const User = require("../models/users");

// usado la sintaxis como crete usando la exportacion de un  objeto y dentro una funcion y asi exportarlo

module.exports = {
  //! sintaxis key: value
  // =========================find all ==============
  findAll: async (req, res) => {
    try {
      const allUsers = await User.find();
      // ===========
      // const isActive = await User.find({ isActive: true });
      // ===========
      // res.status(200).json(isActive); // ! PARA SOLO BSUCAR LOS ACTIVOS
      res.status(200).json(allUsers); // ! Lols users
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
  // ========================Update by id ============================
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.updateOne(id, req.body, {
        new: true, // ! para que retorne el nuevo objeto en el caso de que se haya actualizado
      });
      res.status(200).json({ message: "user updated", user });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al actualizar el usuario", error: err });
    }
  },
  // ========================patch  by============================
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
  // ========================Delete by id  BORRADO FISICO============================
  deleteById: async (req, res) => {
    const { id } = req.params;
    console.log(id, "id in paramas ");
    try {
      const userDeleted = await User.findByIdAndDelete(id);

      console.log(userDeleted, " SOY user deleted");
      res.status(200).json({ message: "user deleted", userDeleted_id }); // ? userDeleted_id PARA QUE NO ME MUESTRE EL ID
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al eliminar el usuario", error: err });
    }
  },
  // ========================Delete borado logico============================
  SoftDelete: async (req, res) => {
    const id = req.params.id;
    console.log(id, "id in paramas ");
    try {
      const userSoftDeleted = await User.findByIdAndUpdate(
        id,
        { isActive: false }, // ! para que no se borre fisicamente
        { new: true } // ! para que retorne el nuevo objeto en el caso de que se haya actualizado
      );
      console.log(userSoftDeleted, " SOY user deleted");

      res.status(200).json({ message: "user deleted succefully " });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al eliminar el usuario", error: err });
    }
  },
};
