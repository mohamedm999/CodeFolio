import jwt from 'jsonwebtoken';

export const verifyToken = (token: string) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not configured');
    }
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const getUser = (authorization?: string) => {
  if (!authorization) return null;

  const token = authorization.replace('Bearer ', '');
  const decoded = verifyToken(token) as any;

  if (!decoded) return null;

  return {
    id: decoded.userId,
    username: decoded.username,
    role: 'Admin'
  };
};
