// forma de llamar a dotenv que se instala y depuyes crear archivo .env
require("dotenv").config();

const express = require("express"); // import express

const mongoose = require("mongoose"); // import mongoose

// hacemos conexion a la base de datos , recuperamos url a la conexion, las credencial del cluster de admin.
// es mala idea la url, porque se puede cambiar en tiempo de ejecucion, por lo que se debe usar una variable de entorno
mongoose
  .connect(process.env.MONGO_URI) // process.env.MONGO_URI variable de entorno.
  .then(() => console.log("conectado a mongoDB"))
  .catch((err) => console.log(err, "error en la conexion"));

const app = express(); //  app is an object
const PORT = process.env.PORT || 3300;

const userRouter = require("./routes/userRouter");

// localHost
app.get("/", (__, res) => {
  res.json({ message: "Backend is working" });
});
// =====================================================
app.use("/users", userRouter);

// =====================================================

app.listen(3300, () => {
  console.log("'%cAPP is running on port 3300", "color: green", PORT);
});
