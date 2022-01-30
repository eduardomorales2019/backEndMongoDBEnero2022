const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

//  aqui creamos el modelo y lo guardo en esta constante.
const Post = mongoose.model("Post", PostSchema);
// exportamos el modelo para poder usarlo en otro archivo.

module.exports = { Post, PostSchema };
