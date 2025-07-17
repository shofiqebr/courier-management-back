
import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'secret';


// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role?: string };
    }
  }
}

// Authentication middleware factory
const auth =
  (roles: string[] = []): RequestHandler =>
  (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ status: false, message: 'Unauthorized: Token missing' });
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role?: string };

      // Check role if provided
      if (roles.length > 0 && (!decoded.role || !roles.includes(decoded.role))) {
        res.status(403).json({ status: false, message: 'Forbidden: insufficient role' });
        return;
      }

      req.user = decoded;
      next();
    } catch (err: any) {
      console.error('JWT verification failed:', err.message);

      // Provide specific message for expired token
      if (err.name === 'TokenExpiredError') {
        res.status(401).json({ status: false, message: 'Token expired' });
      } else {
        res.status(401).json({ status: false, message: 'Invalid token' });
      }
    }
  };

export default auth;

