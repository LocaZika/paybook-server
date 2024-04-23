import { checkExistedBody } from "../../utils";
import {userModel} from "./user.model"

export const userController = {
  index: async (req, res) => {
    const user = await userModel.find().exec();
    res.status(200).json(user);
  },
  get: async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res.status(200).json(user);
  },
  post: async (req, res) => {
    const { username, displayName, password, debt, paid } = req.body;
    const templateModel = ['name', 'displayName', 'password', 'debt', 'paid'];
    const isExistedBody = checkExistedBody(res, res.body, templateModel);
    if (isExistedBody) {
      const newUser = await userModel.create({
        username,
        displayName,
        password,
        isAdmin: false,
        debt,
        paid,
        createdAt,
        updatedAt,
      })
      return res.status(201).json(newUser);
    }
    return;
  },
  patch: async (req, res) => {
    const { id } = req.params;
    const { username, displayName, password, debt, paid } = req.body;
    const templateModel = ['name', 'displayName', 'password', 'debt', 'paid'];
    const isExistedBody = checkExistedBody(res, res.body, templateModel);
    if (isExistedBody) {
      const user = await userModel.findByIdAndUpdate(id, {
        username,
        displayName,
        password,
        debt,
        paid,
      }, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      return res.status(200).json(user);
    }
    return;
  }
}