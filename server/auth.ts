import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { storage } from "./storage";
import { User } from "@shared/schema";
import bcrypt from "bcryptjs";

// JWT Secret (In production, this should be an environment variable)
const JWT_SECRET = "mackenzie_costs_law_secure_jwt_token_key";
const JWT_EXPIRES_IN = "7d";

// Interface for decoded token
interface DecodedToken {
  userId: number;
  username: string;
  role: string;
}

// Extend Request type to include user information
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

// Helper to hash passwords
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Helper to compare passwords
export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Generate JWT token
export const generateToken = (userId: number, username: string, role: string): string => {
  return jwt.sign({ userId, username, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// Authentication middleware
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get token from authorization header first, then from cookies
    const authHeader = req.headers.authorization;
    let token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    
    // If no token in auth header, try cookies
    if (!token && req.cookies) {
      token = req.cookies.token;
    }
    
    console.log("Auth check - Cookie token exists:", !!req.cookies?.token);
    console.log("Auth check - Auth header exists:", !!req.headers.authorization);
    
    if (!token) {
      console.log("Auth check - No token found");
      res.status(401).json({ message: "Authentication required" });
      return;
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    req.user = decoded;
    console.log("Auth check - Token verified for user:", decoded.username);
    
    // Refresh the token on each authenticated request
    if (req.cookies && req.cookies.token) {
      const newToken = generateToken(decoded.userId, decoded.username, decoded.role);
      res.cookie("token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'lax',
        path: '/'
      });
      console.log("Auth check - Token refreshed");
    }
    
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Admin authorization middleware
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Admin access required" });
    return;
  }
  
  next();
};

// Initialize admin user
export const initializeAuth = async (): Promise<void> => {
  // Check if admin exists
  const adminUser = await storage.getUserByUsername("admin");
  
  if (!adminUser) {
    // For development, we'll use plain text password
    // In production, we'd use hashPassword
    const adminPassword = "admin123";
    
    // Create admin user
    await storage.createUser({
      username: "admin",
      password: adminPassword, // For simplicity in development
      name: "Admin User",
      email: "admin@costlawyer.co.uk",
      role: "admin"
    });
    
    console.log("Admin user created successfully");
  }
};

// Login handler
export const loginHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }
    
    // Find user
    const user = await storage.getUserByUsername(username);
    
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
    
    // Simple password check for development (in production, use comparePasswords)
    if (user.password !== password) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
    
    // Generate token
    const token = generateToken(user.id, user.username, user.role);
    
    // Set token in cookie and also return in response body for clients that prefer using local storage
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'lax',
      path: '/'
    });
    
    // Return user data and token
    res.json({
      message: "Login successful",
      token, // Include token in response for clients that want to store it
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

// Logout handler
export const logoutHandler = (_req: Request, res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: '/'
  });
  res.json({ message: "Logout successful" });
};

// Get current user handler
export const getCurrentUserHandler = (req: Request, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }
  
  res.json({
    id: req.user.userId,
    username: req.user.username,
    role: req.user.role
  });
};