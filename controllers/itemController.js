const Item = require("/Users/eduardomorales/Documents/DEVF SA DE CV /KataBackMongoDB/api-mongo-express/models/item.js");

// usado la sintaxis como crete usando la exportacion de un  objeto y dentro una funcion y asi exportarlo

module.exports = {
  //! sintaxis key: value
  // =========================find all ==============
  findAll: async (req, res) => {
    try {
      //const allItem = await User.find();
      // ===========
      const isActive = await Item.find({ isActive: true });
      // ===========
      res.status(200).json(isActive); // ! PARA SOLO BSUCAR LOS ACTIVOS
      //res.status(200).json(allItem);
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
      const newItem = await Item.create(req.body);
      res.status(201).json({ message: "Itemcreated", Item: newItem });
    } catch (err) {
      res.status(400).json({ message: "error creatig Item", error: err });
    }
  },
  // ========================find one by id  ============================
  findByID: async (req, res) => {
    const { id } = req.params;
    console.log(id, "id in paramas ");
    try {
      const ItemFound = await Item.findById(id);
      if (ItemFound) {
        // en lugar que sea === null
        res.status(404).json({
          message: "Item encontrado por el sistema ",
          Item: ItemFound,
        });
      } else {
        res.status(200).json({ message: "Itemencontrado", item: ItemFound });
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Error Item not found, error", error: err });
    }
  },
  // ========================Update by id ============================
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const Item = await Item.updateOne(id, req.body, {
        new: true, // ! para que retorne el nuevo objeto en el caso de que se haya actualizado
      });
      res.status(200).json({ message: "Itemupdated", Item });
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
      const ItemUpDate = await Item.findByIdAndUpdate(id, req.body); //! SIEMPRE HAY QUE MANDAR EL BODY EN  UPDATE DE UN PATCH O PUT
      res.status(200).json({ message: "Itemupdated", ItemUpDate });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al actualizar el Item", error: err });
    }
  },
  // ========================Delete by id  BORRADO FISICO============================
  deleteById: async (req, res) => {
    const { id } = req.params;
    console.log(id, "id in paramas ");
    try {
      const ItemDeleted = await Item.findByIdAndDelete(id);

      console.log(ItemDeleted, " SOY Itemdeleted");
      res.status(200).json({ message: "Itemdeleted", ItemDeleted_id }); // ? ItemDeleted_id PARA QUE NO ME MUESTRE EL ID
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al eliminar el Item", error: err });
    }
  },
  // ========================Delete borado logico============================
  SoftDelete: async (req, res) => {
    const id = req.params.id;
    console.log(id, "id in paramas ");
    try {
      const ItemSoftDeleted = await Item.findByIdAndUpdate(
        id,
        { isActive: false }, // ! para que no se borre fisicamente
        { new: true } // ! para que retorne el nuevo objeto en el caso de que se haya actualizado
      );
      console.log(ItemSoftDeleted, " SOY Itemdeleted");

      res.status(200).json({ message: "Itemdeleted succefully " });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al eliminar el usuario", error: err });
    }
  },
};
