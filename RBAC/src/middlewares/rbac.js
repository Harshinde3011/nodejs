const ROLE_RANK = {
  user: 1,
  admin: 2,
  superAdmin: 3,
};

export const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    const role = req.user?.role;

    if (!role) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (role === "superAdmin") {
      return next();
    }

    if (allowedRoles.includes(role)) {
      return next();
    }

    const minRole = allowedRoles[0];
    if (minRole && ROLE_RANK[role] >= ROLE_RANK[minRole]) {
      return next();
    }

    return res.status(403).json({ 
      status: 403,
      message: "you are not authorized to perform action" });
  };
};
