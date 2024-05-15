import mongoose, { Query, mongo } from "mongoose";
import { userModel } from "./user.model";
import { isExistValue, isValidValue } from "../../utils";

export const userController = {
  index: async (req, res) => {
    const users = await userModel.find().select(["displayName", "expenses"]).exec();
    let usersData = [];
    users.forEach((user) => {
      let userData = {
        _id: user._id,
        displayName: user.displayName,
        paied: 0,
      };
      user.expenses.forEach((expense) => {
        if (expense.isPaid == false) {
          userData.paied += expense.cost;
        }
        return;
      });
      usersData.push(userData);
    });
    return res.status(200).json(usersData);
  },
  get: async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res.status(200).json(user);
  },
  addExpense: async (req, res) => {
    const { payerId, expenseName, cost } = req.body;
    if (!payerId || typeof payerId !== "string") {
      return res.status(400).json({ message: "Invalid payer ID!" });
    }
    if (!expenseName || typeof expenseName !== "string") {
      return res.status(400).json({ message: "Invalid expense name!" });
    }
    if (!cost || typeof cost !== "number") {
      return res.status(400).json({ message: "Invalid cost value!" });
    }
    const newExpense = {
      name: expenseName,
      cost,
      isPaid: false,
    };
    await userModel.findByIdAndUpdate(payerId, { $push: { expenses: newExpense } }).exec();
    return res.status(201).json({
      ok: true,
      message: "Added expense successfully!",
    });
  },
  updateExpense: async (req, res) => {
    const { expenseId, expenseName, cost, isPaid } = req.body;
    await userModel
      .findOne({ "expenses._id": expenseId })
      .exec()
      .then((doc) => {
        const expense = doc.expenses.id(expenseId);
        expense.isPaid = isPaid ? true : false;
        expense.name = expenseName ? expenseName : expense.name;
        expense.cost = cost ? cost : expense.cost;
        doc
          .save()
          .then((result) =>
            res
              .status(200)
              .json({ ok: true, message: "Updated the expense successfully!", data: result })
          )
          .catch((err) =>
            res.status(500).json({ ok: false, message: "Update expense failed!", detail: err })
          );
      })
      .catch((err) => res.status(400).json({ ok: false, message: "User not found!", detail: err }));
  },
  removeExpense: async (req, res) => {
    const { expenseIds, payerId } = req.body;
    const user = await userModel.findById(payerId).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.expenses.pull(...expenseIds);
    await user
      .save()
      .then((result) =>
        res.status(200).json({ ok: true, message: "Remove expenses successfully!", data: result })
      )
      .catch((err) =>
        res.status(500).json({ ok: false, message: "Remove expenses failed!", detail: err })
      );
  },
};
