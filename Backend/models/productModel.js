const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, " Please enter product name "],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, " Please enter  product price "],
    maxLength: [8, "Price cannot exceed 8 figures"],
  },

  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  Stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [4, " Stock cannot exceed 4 characters"],
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
