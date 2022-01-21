const express = require("express"); // import express

const router = express.Router(); // routes is an object

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "all user", users: [] });
});

router.post("/", (req, res, next) => {
  res
    .status(201)
    .json({
      message: "user created",
      user: { name: "Eduardo", email: "eduardo@inmo-puebla.com", age: 40 },
    });
});
module.exports = router;
