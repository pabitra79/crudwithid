const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserschemaModel = new Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Userschema = mongoose.model("Usercrud", UserschemaModel);
module.exports = Userschema;
