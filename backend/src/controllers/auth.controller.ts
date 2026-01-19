import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.util';

const prisma = new PrismaClient();

// ANTI-PATTERN: Try/catch répétitif dans chaque méthode
// ANTI-PATTERN: Appel direct à Prisma au lieu de service
// ANTI-PATTERN: Validations manuelles avec if/else
// ANTI-PATTERN: Utilisation de any
export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // ANTI-PATTERN: Validation manuelle au lieu de Zod
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
      if (!password) {
        return res.status(400).json({ message: 'Password is required' });
      }
      if (typeof email !== 'string') {
        return res.status(400).json({ message: 'Email must be a string' });
      }
      if (typeof password !== 'string') {
        return res.status(400).json({ message: 'Password must be a string' });
      }

      // ANTI-PATTERN: Logique métier dans le controller
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user.id);

      // ANTI-PATTERN: any pour le type de retour
      const response: any = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin,
        token,
      };

      return res.status(200).json(response);
    } catch (error: any) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName } = req.body;

      // ANTI-PATTERN: Validations manuelles répétitives
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
      if (!password) {
        return res.status(400).json({ message: 'Password is required' });
      }
      if (!firstName) {
        return res.status(400).json({ message: 'First name is required' });
      }
      if (!lastName) {
        return res.status(400).json({ message: 'Last name is required' });
      }
      if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters' });
      }

      // ANTI-PATTERN: Logique métier dans le controller
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          admin: false,
        },
      });

      const token = generateToken(user.id);

      // ANTI-PATTERN: any
      const response: any = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin,
        token,
      };

      return res.status(201).json(response);
    } catch (error: any) {
      console.error('Register error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
