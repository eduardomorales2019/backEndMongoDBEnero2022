const User = require("../models/users");
const { Post } = require("../models/post");
const user = require("../models/users");
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
      // const userFound = await User.findById(id, { isActive: true });
      const userFound = await User.findById(id);
      if (!userFound) {
        // en lugar que sea === null
        res.status(404).json({
          message: "User no encontrado por el sistema ",
          user: userFound,
        });
      } else {
        res
          .status(200)
          .json({ message: "User encontrado or inactivo", user: userFound });
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

  // ========================post create============================
  //! se crea una nueva instancia de la coleccion de mongo, que ya esta definida en el modelo por defecto
  createPost: async (req, res) => {
    //!pendiente  pasar param is active!
    const { id } = req.params;
    try {
      console.log(id, "Soy id en el params here!!!");
      const userFound = await User.findById(id);
      console.log(userFound, "SOY user found");
      if (!userFound)
        res.status(404).json({ message: "User no encontrado por el sistema " });
      //? AQUI CREAMOS EL POST===========================
      // creamo la instancia de POST
      const newPost = new Post(req.body);
      //userFound[0].post.push(newPost); // esta se agrega a la utima posisicon del arreglo.
      //
      userFound.post.push(newPost);
      // hay que forzar el save para que se guarde en la base de datos como documento embebido, como subdocumentso y no como una propiedad y se guarde en la base de datos
      await userFound.save(); // mongo detecta que a este usuario le agrego este subdocumeto. y lo guarda en la base de datos
      // await newPost.save(); // MODO GUARDO POST EN LA BASE DE DATOS
      //! =============================================
      //ojo  al relizar el save de post o modelo newpost.  se guarda en la base de datos como un documento embebido, como subdocumentso y no como una propiedad y se guarda en la base de datos y ya que  se giuarda en el archivo de user.js

      //! =============================================
      //Este seria el HardCode, directo
      // userFound.post = { title: "hola", body: "Cuerpo informacion" };
      res
        .status(200)
        //.json({ message: "post created succefully ", user: newPost }); //! modo guardo POST
        .json({ message: "post created succefully ", user: userFound });
      //!! este era el problema de los headers sent already to the client, can be sent twice!!
      // return res
      //   .status(200)
      //   .json({ message: "User encontrado or inactivo", user: userFound });
    } catch (err) {
      console.log(err, "soy error. here!!!");
      res.status(500).json({ message: "error creatig post ", error: err });
    }
  },
  // ========================get all posts by id============================
  findAllPost: async (req, res) => {
    const { id } = req.params;
    try {
      const UserFound = await User.findOne({ id, isActive: true });
      res
        .status(200)
        .json({ message: "User encontrado or inactivo", user: UserFound });
    } catch (err) {
      console.log(err, "soy error. here!!!");
      res
        .status(500)
        .json({ message: "Error al obtener los posts", error: err });
    }
  },
  // ======================== delete posts by id============================
  deletePostById: async (req, res) => {
    const { id } = req.params;
    console.log(id, "id in paramas ");
    try {
      userFound = await User.deleteOne({ _id: id });
      res.status(200).json({ message: "post deleted succefully " });
    } catch (err) {
      console.log(err, "soy error. here!!!");
      res
        .status(500)
        .json({ message: "Error al eliminar el post", error: err });
    }
  },
};
