const express = require("express"); // import express

const router = express.Router(); // routes is an object
// =========================
const itemController = require("/Users/eduardomorales/Documents/DEVF SA DE CV /KataBackMongoDB/api-mongo-express/controllers/itemController.js");
// =========================
//! Verbos HTTP
// =========================GET===========================
router.get("/", itemController.findAll);
// =========================POST===========================

router.post("/", itemController.create);
// ========================find one============================
router.get("/:id", itemController.findByID);
// ========================uopdate one OR BULK (QUE SON MUCHOS, SE HACE UNA ACTUALIZACION, ejempo zentra 2016 y precios diferentes, bulk, se manda en un arreglo bulk[id.id2] , price , 2000) ============================
router.patch("/:id", itemController.upDateOnebyID);
// ========================delete fisico============================
router.delete("/:id", itemController.deleteById);
// ========================delete logico=  mediante na bandera, flag, cambiar, is active===========================
router.delete("/:id/Soft-Delete", itemController.SoftDelete); //  /:id/Soft-Delete

// =========================
module.exports = router;
