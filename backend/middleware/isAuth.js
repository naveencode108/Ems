import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    let token = req.header["Authorization"].replace("Bearer", "");

    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });

    let decode = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decode.id;

    next();
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};
