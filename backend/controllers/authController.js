import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ success: false, message: "All field required" });

    let user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    let comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass)
      return res.status(401).json({ success: false, message: "Invalid email or password" });

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token
    });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
};
