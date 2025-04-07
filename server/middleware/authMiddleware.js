// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const protectAdmin = async (req, res, next) => {
  // Check token from Authorization header or cookies
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("isAdmin email name");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }
    if (!user.isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }
    req.user = user; // Attach full user object to req
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Not authorized, invalid token" });
  }
};

// Export only protectAdmin since isAdmin is redundant
export default protectAdmin;