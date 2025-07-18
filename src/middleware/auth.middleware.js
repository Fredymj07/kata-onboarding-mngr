import jwt from 'jsonwebtoken';

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient role' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token', detail: err.message });
    }
  };
};
