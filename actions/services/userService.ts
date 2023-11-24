// services/userService.ts
import bcrypt from 'bcrypt';
import { HttpStatusCodes } from '../../helper/type';
import UserRepository from '../repositories/userRepository';

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(data: { email: string; password: string; name: string }) {
    try {
      const { email, password, name } = data;

      // Validate fields
      if (!email || !password || !name) {
        return { message: 'Invalid fields!', status: HttpStatusCodes[422] };
      }

      // Check exist email
      const existEmail = await this.userRepository.findByEmail(email);
      if (existEmail) {
        return { message: 'Email already exists!', status: HttpStatusCodes[422] };
      }

      // Hash passwords
      const hashedPassword = await bcrypt.hash(password, 12);

      // Register user
      const user = await this.userRepository.createUser({
        email,
        name,
        password: hashedPassword,
      });

      if (!user) {
        return { message: 'Cannot create user!', status: HttpStatusCodes[500] };
      }

      return { message: 'User Created', body: { userId: user.id }, status: HttpStatusCodes[201] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }
}

export default UserService;
