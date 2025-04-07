// middleware/userAuth.js
import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = tokenDecode.id; // Still useful for other routes
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;