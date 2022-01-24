// importar mongoose
const mongoose = require("mongoose");

// importar schema de mongoose

const { Schema } = mongoose;
// defino el esquema de la coleccion
// Se de fine aqi los campos de nuestra tabla  y en en mongo se llama, coleccion .
const userSchema = new Schema({
  name: String,
  lastName: { type: String, required: true, default: "lastName", unique: true },
  email: { type: String, unique: true, required: true },

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

  //!COMMENTS ALGO PODEREOSO EN LOS BASES DE DATOS NO RELACIONALES
  // commets : [{ body: String, date: Date.now(), age:date.now() }],
  //ç7 dentro del esquema se puede definir una relacion de muchos a muchos, que es un areglo  de objetos
});
// definir  el segundo parametro  como schema en este codigo de aqui abajo!
const user = mongoose.model("User", userSchema);

module.exports = user;
