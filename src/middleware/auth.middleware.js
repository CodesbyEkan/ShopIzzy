import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const protectedAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(401)
        .json({ status: false, message: "user unauthorized!" });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("error with authorization", err.message);
  }
};
