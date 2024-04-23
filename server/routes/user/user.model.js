const { Schema, model } = require("mongoose");

const user = {
  username: String,
  displayName: String,
  password: String,
  isAdmin: Boolean,
  debt: Number,
  paid: Number,
  createdAt: Date,
  updatedAt: Date,
};

const userSchema = new Schema(user, { timestamps: true } );

export const userModel = model('user', userSchema);