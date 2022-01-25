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
app.use(express.json()); // !middleware MIDDLEWARE OARA QUE SE PUEDA ENVIAR DATOS DE FORMA JSON, Y QUE ESTA ANTES DE NUESTROS RUTEOS!!   PERMITE PARSEAR POR SI LLEGA EL BODY Y PODEMOS TRABAJR CON EL .
const PORT = process.env.PORT || 3300;

const userRouter = require("./routes/userRouter");
const itemRouter = require("./routes/itemRouter");
const ticketRouter = require("./routes/ticketRouter");
// localHost
app.get("/", (__, res) => {
  res.json({ message: "Backend  NO SQL -G8 is working 😎" });
});
// ========index aqui lo pusimos y no lo creamos en en index en router  =============================================
app.use("/users", userRouter);
app.use("/items", itemRouter);
app.use("/tickets", ticketRouter);

// =====================================================

app.listen(3300, () => {
  console.log("'%cAPP is running on port 3300", "color: green", PORT);
});
