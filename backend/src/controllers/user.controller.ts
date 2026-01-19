import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

// ANTI-PATTERN: Try/catch répétitif
// ANTI-PATTERN: Appel direct à Prisma
// ANTI-PATTERN: any
export class UserController {
  async getById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      // ANTI-PATTERN: Validation manuelle
      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const userId = parseInt(id);

      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      // ANTI-PATTERN: Logique dans controller
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // ANTI-PATTERN: any
      const response: any = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return res.status(200).json(response);
    } catch (error: any) {
      console.error('Get user error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      // ANTI-PATTERN: Validation manuelle
      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const userId = parseInt(id);

      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      // ANTI-PATTERN: Vérification d'autorisation dans controller
      if (req.userId !== userId) {
        return res.status(403).json({ message: 'You can only delete your own account' });
      }

      // ANTI-PATTERN: Logique dans controller
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await prisma.user.delete({
        where: { id: userId },
      });

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
      console.error('Delete user error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
