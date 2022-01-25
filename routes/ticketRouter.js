const express = require("express"); // import express

const router = express.Router(); // routes is an object
// =========================
const ticketController = require("../controllers/ticketController");
// =========================
//! Verbos HTTP
// =========================GET===========================
router.get("/", ticketController.findAll);
// =========================POST===========================

router.post("/", ticketController.create);
// ========================find one============================
router.get("/:id", ticketController.findByID);
// ========================uopdate one OR BULK (QUE SON MUCHOS, SE HACE UNA ACTUALIZACION, ejempo zentra 2016 y precios diferentes, bulk, se manda en un arreglo bulk[id.id2] , price , 2000) ============================
router.patch("/:id", ticketController.upDateOnebyID);
// ========================delete fisico============================
router.delete("/:id", ticketController.deleteById);
// ========================delete logico=  mediante na bandera, flag, cambiar, is active===========================
router.delete("/:id/Soft-Delete", ticketController.SoftDelete); //  /:id/Soft-Delete

// =========================
module.exports = router;
