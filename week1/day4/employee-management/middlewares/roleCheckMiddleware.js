const roleCheckMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const role = req.headers["x-role"];
    if (!role) {
      return res.status(400).json({ message: "Role header (x-role) is required" });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }

    next();
  };
};

module.exports = roleCheckMiddleware;
