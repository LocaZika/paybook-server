const { Schema, model } = require("mongoose");

const expense = {
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  isPaid: { type: Boolean, required: true, default: false },
  createdAt: Date,
  updatedAt: Date,
};
export const expenseSchema = new Schema(expense, { timestamps: true });

const user = {
  username: { type: String, required: true },
  displayName: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  expenses: [expenseSchema],
  createdAt: Date,
  updatedAt: Date,
};

const userSchema = new Schema(user, { timestamps: true });

export const userModel = model("user", userSchema);
