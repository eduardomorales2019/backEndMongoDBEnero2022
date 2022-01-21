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
// ====================================================

// =========================
module.exports = router;
