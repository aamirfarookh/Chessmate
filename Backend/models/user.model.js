let mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    full_name: String,
    avatar: String,
    nor_of_games: { type: Number, default: 0 },
    nor_of_wins: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  }
);

let UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
