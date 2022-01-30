// importar mongoose
const mongoose = require("mongoose");
const { Post, PostSchema } = require("../models/post");
// importar schema de mongoose

const { Schema } = mongoose;

// =============================schema de los post  =
// const postSchema = {
//   title: {
//     type: String,
//     required: true,
//   },
//   body: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   isActive: {
//     type: Boolean,
//     default: true,
//   },
// };

// ==============================
// defino el esquema de la coleccion
// Se de fine aqi los campos de nuestra tabla  y en en mongo se llama, coleccion .
const userSchema = new Schema({
  name: String,
  lastName: { type: String, unique: true, required: true },
  email: { type: String, unique: true },

  age: {
    type: Number,
    min: [18, "No puedes ser menor de 18 años"],
    max: [100, "No puedes ser mayor de 100 años"],
  },
  role: {
    type: String,
    default: "USER",
    enum: ["USER", "ADMIN", "SELLER"],
  },
  isActive: { type: Boolean, default: true },
  post: [PostSchema], // aqui se puede agregar mas de una coleccion y el subdocumentos del documento, el cual es un aray de post

  //!COMMENTS ALGO PODEREOSO EN LOS BASES DE DATOS NO RELACIONALES
  // commets : [{ body: String, date: Date.now(), age:date.now() }],
  //ç7 dentro del esquema se puede definir una relacion de muchos a muchos, que es un areglo  de objetos
});
// definir  el segundo parametro  como schema en este codigo de aqui abajo!
const user = mongoose.model("User", userSchema);

module.exports = user;
