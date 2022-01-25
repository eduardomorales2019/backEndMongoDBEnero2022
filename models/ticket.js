const mongoose = require("mongoose"); // ayuda  definir el schema
const { Schema } = mongoose;

const TicketSchema = new Schema({
  subtotal: {
    type: Number,
    default: 0,
  },
  Iva: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  item: [
    {
      //! aqui se puede definir una relacion de muchos a muchos, que es un areglo  de objetos, pero en este array  pero definimos los daos de cada item
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item", // referencia a la coleccion de items
      required: true,
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  usuarios: {
    //  aqui seria muchos a uno  de usuarios
    type: Schema.Types.ObjectId,
    ref: "User", // ! referncia a la coleccion de usuarios
    required: true,
  },
});

const Ticket = mongoose.model("Ticket", TicketSchema); // mongo agrgara el plural de item en compose

module.exports = Ticket;
