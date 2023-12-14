import type { UserUpdateType } from '@/actions/controller/userController';
import type { User } from '@prisma/client';
import prisma from '../../helper/lib/prismadb';

class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { email } });
  }

  async createUser(data: { email: string; name: string; password: string }): Promise<User> {
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        emailConfirmed: false,
      },
    });
  }

  async updateUserPassword(email: string, hashedPassword: string): Promise<void> {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });
  }

  async getUserById(userId: string) {
    return prisma.user.findFirst({ where: { id: userId } });
  }

  async updateUser({ userId, name, email, bio, image }: UserUpdateType & { userId: string }) {
    return await prisma.user.update({
      where: { id: userId },
      data: { name, email, bio, image },
    });
  }
}

export default UserRepository;
