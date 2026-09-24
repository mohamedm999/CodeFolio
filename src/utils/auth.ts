import jwt from 'jsonwebtoken';
import { TokenBlacklist } from '../models/TokenBlacklist.model';

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

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  try {
    const blacklisted = await TokenBlacklist.findOne({ token });
    return !!blacklisted;
  } catch (error) {
    console.error('Error checking token blacklist:', error);
    return false;
  }
};

export const getUser = async (authorization?: string) => {
  console.log('Authorization header:', authorization);
  if (!authorization) return null;

  const token = authorization.replace('Bearer ', '');
  console.log('Extracted token:', token.substring(0, 20) + '...');
  
  // Vérifier si le token est dans la blacklist
  const isBlacklisted = await isTokenBlacklisted(token);
  console.log('Is blacklisted:', isBlacklisted);
  if (isBlacklisted) {
    return null;
  }

  const decoded = verifyToken(token) as any;
  console.log('Decoded token:', decoded);

  if (!decoded) return null;

  return {
    id: decoded.userId,
    username: decoded.username,
    role: 'Admin',
    token // On garde le token pour pouvoir le blacklister au logout
  };
};
