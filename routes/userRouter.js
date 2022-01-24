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
// ========================uopdate one OR BULK (QUE SON MUCHOS, SE HACE UNA ACTUALIZACION, ejempo zentra 2016 y precios diferentes, bulk, se manda en un arreglo bulk[id.id2] , price , 2000) ============================
router.patch("/:id", userControler.upDateOnebyID);
// ========================delete fisico============================
router.delete("/:id", userControler.deleteById);
// ========================delete logico=  mediante na bandera, flag, cambiar, is active===========================
router.delete("/:id/Soft-Delete", userControler.SoftDelete); //  /:id/Soft-Delete

// =========================
module.exports = router;
