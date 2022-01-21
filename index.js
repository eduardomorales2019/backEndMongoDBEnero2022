const express = require("express"); // import express
const app = express(); //  app is an object
const PORT = process.env.PORT || 3300;

const userRouter = require("./routes/userRouter");

// localHost
app.get("/", (__, res) => {
  res.json({ message: "Backend is working" });
});
// =====================================================
app.use("/users", userRouter);

// =====================================================

app.listen(3300, () => {
  console.log("'%cAPP is running on port 3300", "color: green", PORT);
});
