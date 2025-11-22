import createHttpError from "http-errors";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createHttpError(409, "Conflict error");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    hashedPassword
  })

  res.status(201).json(newUser)
}
