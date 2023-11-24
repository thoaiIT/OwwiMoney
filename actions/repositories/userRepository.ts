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
}

export default UserRepository;
