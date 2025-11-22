import createHttpError from "http-errors";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { createSession, setSessionCookies } from "../services/auth.js";
import { Session } from "../models/session.js";

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
    password: hashedPassword
  })

  res.status(201).json(newUser)
}

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, "Invalid user");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, "Invalid user");
  }

  await Session.deleteOne({ userId: user._id});
  const newSession = await createSession(user._id);

  setSessionCookies(res, newSession);

  res.status(200).json(user);
}

export const userLogout = async (req, res) => {
  const { sessionId } = req.cookies;

  await Session.deleteOne({ _id: sessionId });

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("sessionId");


  res.status(204).send();
}

export const refreshSession = async (req, res) => {
  const session = await Session.findOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  })

  if (!session) {
    throw createHttpError(401, "Session not found");
  }


  const isSessionTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, "Session token expired");
  }

  await Session.deleteOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken
  });


  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({
    message: "Successfully refreshed a session!",
  })
}
