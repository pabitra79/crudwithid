const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductschemaModel = new Schema(
  {
    Product_name: {
      type: String,
      required: true,
    },
    Product_color: {
      type: [String],
      required: true,
    },
    Product_size: {
      type: [String],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usercrud",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Productschema = mongoose.model("Productcrud", ProductschemaModel);
module.exports = Productschema;
