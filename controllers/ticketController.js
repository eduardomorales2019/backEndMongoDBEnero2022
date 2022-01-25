const Ticket = require("../models/ticket");

// usado la sintaxis como crete usando la exportacion de un  objeto y dentro una funcion y asi exportarlo

module.exports = {
  //! sintaxis key: value
  // =========================find all ==============
  findAll: async (req, res) => {
    try {
      const allActiveTickets = await Ticket.find();
      // ===========
      // const isActive = await Ticket.find({ isActive: true });
      // ===========
      // res.status(200).json(isActive); // ! PARA SOLO BSUCAR LOS ACTIVOS
      res
        .status(200)
        .json({ message: "all tickets", tickets: allActiveTickets }); // ! Lols Tickets
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
      const newTicket = await Ticket.create(req.body);
      res.status(201).json({ message: "Ticket created", Ticket: newTicket });
    } catch (err) {
      res.status(400).json({ message: "error creating Ticket ", error: err });
    }
  },
  // ========================find one by id  ============================
  findByID: async (req, res) => {
    const { id } = req.params;
    console.log(id, "id in paramas ");
    try {
      const TicketFound = await Ticket.findById(id);
      if (!TicketFound) {
        // en lugar que sea === null
        res.status(404).json({
          message: "Ticket no encontrado por el sistema ",
          Ticket: TicketFound,
        });
      } else {
        res
          .status(200)
          .json({ message: "Ticket encontrado", Ticket: TicketFound });
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Error Ticket not found, error", error: err });
    }
  },
  // ========================Update by id ============================
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const Ticket = await Ticket.updateOne(id, req.body, {
        new: true, // ! para que retorne el nuevo objeto en el caso de que se haya actualizado
      });
      res.status(200).json({ message: "Ticket updated", Ticket });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al actualizar el ticket", error: err });
    }
  },
  // ========================patch  by============================
  upDateOnebyID: async (req, res) => {
    try {
      const { id } = req.params;
      const TicketUpDate = await Ticket.findByIdAndUpdate(id, req.body); //! SIEMPRE HAY QUE MANDAR EL BODY EN  UPDATE DE UN PATCH O PUT
      res.status(200).json({ message: "Ticket updated", TicketUpDate });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al actualizar el ticket", error: err });
    }
  },
  // ========================Delete by id  BORRADO FISICO============================
  deleteById: async (req, res) => {
    const { id } = req.params;
    console.log(id, "id in paramas ");
    try {
      const TicketDeleted = await Ticket.findByIdAndDelete(id);

      console.log(TicketDeleted, " SOY Ticket deleted");
      res.status(200).json({ message: "Ticket deleted", TicketDeleted_id }); // ? TicketDeleted_id PARA QUE NO ME MUESTRE EL ID
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
      const TicketSoftDeleted = await Ticket.findByIdAndUpdate(
        id,
        { isActive: false }, // ! para que no se borre fisicamente
        { new: true } // ! para que retorne el nuevo objeto en el caso de que se haya actualizado
      );
      console.log(TicketSoftDeleted, " SOY Ticket deleted");

      res.status(200).json({ message: "Ticket deleted succefully " });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al eliminar el usuario", error: err });
    }
  },
};
