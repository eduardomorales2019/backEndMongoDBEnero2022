const mongoose = require("mongoose"); // ayuda  definir el schema
const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 10,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Item = mongoose.model("Item", ItemSchema); // mongo agrgara el plural de item en compose

module.exports = Item;
