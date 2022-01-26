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

// =========================PATCH DE TCIKETS DE IVA SUMA===========================
//!CALCULAR EL IVA Y TOTAL DE CADA ITEM
// SE NECEITA ACDTUALIZAR EL TICKET.
//? 1. ENCONTRAR EL TYICKET POR ID
//? 2.  RECUPERAR LOS ITEMS DEL TICKET  NECESITANDO EL PRECIO
//? 3.  CALCULAR EL IVA Y TOTAL DE CADA ITEM, HACER OPERACIONES.
//? 4.  ACTUALIZAR EL TICKET
//? 5.  RETORNAR EL TICKET ACTUALIZADO
router.patch("/taxes/:id", ticketController.calculateTaxes);

// =========================
module.exports = router;
