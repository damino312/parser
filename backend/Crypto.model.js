const mongoose = require("mongoose");
const { Schema } = mongoose;

const cryptoNameSchema = new Schema({
  name: { type: String, unique: true },
});

const cryptoValueSchema = new Schema(
  {
    name: { type: Schema.Types.ObjectId, ref: "cryptoName", required: true },
    price: Number,
    volume24: Number,
  },
  { timestamps: true }
);

const cryptoNameModel = mongoose.model("cryptoName", cryptoNameSchema);
const cryptoValueModel = mongoose.model("cryptoValue", cryptoValueSchema);

module.exports = { cryptoNameModel, cryptoValueModel };
