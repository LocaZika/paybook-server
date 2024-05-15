import { generateToken } from "../../utils";
import { userModel } from "../user/user.model";
import { hash, compare } from "bcrypt";

const saltRounds = 10;

export const authController = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    compare(password, user.password, async (err, result) => {
      if (result) {
        const userData = {
          id: user._id.toString(),
          username: user.username,
          password: user.password,
          displayName: user.displayName,
          isAdmin: user.isAdmin,
          expenses: [],
        };
        const token = generateToken(userData);
        return res.status(200).json({
          statusCode: 200,
          ok: true,
          token,
        });
      } else {
        return res.status(401).json({ message: "Invalid password!" });
      }
    });
  },
  register: async (req, res) => {
    const { username, password, displayName } = req.body;
    const user = await userModel.findOne({ username }).exec();
    if (user) {
      return res.status(409).json({ message: "User already exists!" });
    }
    hash(password, saltRounds, async (err, hash) => {
      const userData = {
        username,
        password: hash,
        displayName,
        isAdmin: false,
        expenses: [],
      };
      const newUser = await userModel.create(userData);
      const resFromDB = {
        ...newUser,
        id: newUser._id.toString(),
      };
      const token = generateToken(resFromDB);
      return res.status(201).json(token);
    });
  },
};
