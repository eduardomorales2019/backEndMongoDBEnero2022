const express = require("express"); // import express
const userControler = require("/Users/eduardomorales/Documents/DEVF SA DE CV /KataBackMongoDB/api-mongo-express/controllers/userControler.js");

const router = express.Router(); // routes is an object
// =========================
const userContoller = require("/Users/eduardomorales/Documents/DEVF SA DE CV /KataBackMongoDB/api-mongo-express/controllers/userControler.js");
// =========================
//! Verbos HTTP
// =========================GET===========================
router.get("/", userContoller.findAll);
// =========================POST===========================

router.post("/", userControler.create);
// ========================find one============================
router.get("/:id", userControler.findByID);
// ========================delete Id============================
router.delete("/:id", userControler.deleteById);
// ========================uopdate one OR BULK (QUE SON MUCHOS, SE HACE UNA ACTUALIZACION, ejempo zentra 2016 y precios diferentes, bulk, se manda en un arreglo bulk[id.id2] , price , 2000) ============================
router.patch("/:id", userControler.upDateOnebyID);

// =========================
module.exports = router;
