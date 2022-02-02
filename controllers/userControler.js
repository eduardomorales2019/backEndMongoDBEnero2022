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
      const UserFound = await User.findOne({ _id: id, isActive: true }); // importrate el _id para que  muestre el id

      if (!UserFound)
        res.status(404).json({ message: "User no encontrado por el sistema " });
      const { lastName, post } = UserFound;

      res.status(200).json({
        message: `POST RELATED WITH USER: ${UserFound.name || ""}, ${lastName}`,
        user: post,
      });
    } catch (err) {
      console.log(err, "soy error. here!!!");
      res
        .status(500)
        .json({ message: "Error al obtener los posts", error: err });
    }
  },
  // ======================== find one1  YO ============================
  /*
  findOnePostById: async (req, res) => {
    const { id, postId } = req.params;
    try {
      const UserFound = await User.findOne({ _id: id, isActive: true });
      if (!UserFound)
        res.status(404).json({ message: "User no encontrado por el sistema " });
      res.status(200).json({
        message: "temporary respose",
        post: UserFound.post.id(postId),
      });
    } catch (error) {
      res.status(404).json({ message: "error al obtener el post", error });
    }
  },
  */
  // ======================== find one2  DEVF VICTOR============================

  findOnePostById: async (req, res) => {
    const { id, postId } = req.params;

    try {
      const userFound = await User.findOne({ _id: id, is_active: true });
      if (!userFound)
        res.status(404).json({ message: "User  inactive or not found" });

      const postFound = userFound.post.find(
        // ! aqui busca el post por id
        (post) => post._id.toString() === postId //
      ); //
      if (postFound === undefined || !postFound.isActive) {
        return res
          .status(404)
          .json({ message: "Post in user not found or inactive" });
      }

      res.status(200).json({
        message: "Post in User",
        post: postFound,
      });
    } catch (error) {
      res.status(500).json({ message: "Error recover one user post", error });
    }
  },

  // ======================== UDDATE by id============================

  updateOnePost: async (req, res) => {
    const { id, postId } = req.params;

    try {
      const userFound = await User.findOneAndUpdate({
        _id: id,
        isActive: true,
      });
      if (!userFound)
        res.status(404).json({ message: "User  inactive or not found" });
      const postFound = userFound.post.find(
        (post) => post._id.toString() === postId // ! aqui busca el post por id, es embebido en  y por eso por medio del find hacemos la busqueda
      );

      // no usar metodo findByIdAndUpdate, ya que no se puede usar el metodo findByIdAndUpdate ya que  un subdocumento. ! es un documento embebido y no una propiedad
      console.log(userFound.post[2]._id, "soy user found!!!!");

      if (postFound === undefined || !postFound.isActive) {
        return res
          .status(404)
          .json({ message: "Post in user not found or inactive" });
      }

      // set() por detrás ejecuta un tipo update
      // mongo reconoce o identifica que se esta haciendo una
      // actualizacion de un subdocumento de el (padre)
      postFound.set(req.body);

      await userFound.save();

      res.status(200).json({
        message: "Post updated successfully in user",
        post: userFound,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updated one user post", error });
    }
  },

  // ======================== soft posts by id============================

  softPostDelete: async (req, res) => {
    const { id, postId } = req.params;

    try {
      const userFound = await User.findOne({ _id: id, is_active: true });
      if (!userFound)
        res.status(404).json({ message: "User  inactive or not found" });
      console.log(userFound);
      const postFound = userFound.post.find(
        (post) => post._id.toString() === postId
      );
      console.log(postFound, "soy post found");
      if (postFound === undefined || !postFound.isActive) {
        return res
          .status(404)
          .json({ message: "Post in user not found or inactive" });
      }

      postFound.set({ isActive: false });
      await userFound.save();

      res.status(200).json({
        message: "Post in user deleted successfully ",
      });
    } catch (error) {
      console.log(error, "soy error. here!!!");
      res.status(500).json({ message: "Error deleted user post", error });
    }
  },
};
