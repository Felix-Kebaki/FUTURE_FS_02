const jwt = require("jsonwebtoken");

const Protect = async (req, res, next) => {
  const jwt = req.cookies.jwt;
  try {
    if (!jwt) {
      return res.status(401).json({ error: "Unauthorize access, No token" });
    }

    const decoded = jwt.verify(jwt, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Unauthorize access, Invalid token" });
    }

    req.user = await Admin.findById(decoded.userId).select("-password");
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
    console.error(error.message || error);
  }
};

module.exports = Protect;
