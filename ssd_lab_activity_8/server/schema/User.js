const mongoose = require("mongoose");

let Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    roll: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "ta"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
