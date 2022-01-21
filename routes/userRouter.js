const express = require("express"); // import express

const router = express.Router(); // routes is an object
// =========================
const userContoller = require("/Users/eduardomorales/Documents/DEVF SA DE CV /KataBackMongoDB/api-mongo-express/controllers/userControler.js");
// =========================
// asimilando un controlador, pero lo vamos a mandar ! se define como controlador o  modulo!!
router.get("/", (req, res, next) => {
  userContoller.create();
  res.status(200).json({ message: "all users", users: [] });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "user created",
    user: { name: "Eduardo", email: "eduardo@inmo-puebla.com", age: 40 },
  });
});
module.exports = router;
