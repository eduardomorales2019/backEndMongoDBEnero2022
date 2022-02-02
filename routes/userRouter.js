const express = require("express"); // import express

const router = express.Router(); // routes is an object
// =========================
const userController = require("/Users/eduardomorales/Documents/DEVF SA DE CV /KataBackMongoDB/api-mongo-express/controllers/userControler.js");
// =========================
//! Verbos HTTP
// =========================GET===========================
router.get("/", userController.findAll);
// =========================POST===========================

router.post("/", userController.create);
// ========================find one============================
router.get("/:id", userController.findByID);
// ========================uopdate one OR BULK (QUE SON MUCHOS, SE HACE UNA ACTUALIZACION, ejempo zentra 2016 y precios diferentes, bulk, se manda en un arreglo bulk[id.id2] , price , 2000) ============================
router.patch("/:id", userController.upDateOnebyID);
// ========================delete fisico============================
router.delete("/:id", userController.deleteById);
// ========================delete logico=  mediante na bandera, flag, cambiar, is active===========================
router.delete("/:id/Soft-Delete", userController.SoftDelete); //  /:id/Soft-Delete

//! ===============SUBR UTA DE USUARIOS, RUTAS DE POSTS MODELO POST===========================
// ora trefactor de los metodos corregidos usar middleware  findUSER !!!( que es encontrar el usuario. )
// CREATE
router.post("/post/:id", userController.createPost);
//FIND ALL
router.get("/post/:id", userController.findAllPost);
// FIND ONE  post by id
router.get("/post/:id/:postId", userController.findOnePostById);
// UPDATE ONE
router.patch("/post/:id/:postId", userController.updateOnePost);
// DELETE ONE LOGICO.
router.delete("/post/:id/:postId", userController.softPostDelete);
// =========================
module.exports = router;
