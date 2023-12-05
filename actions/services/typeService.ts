import type TypeRepository from '@/actions/repositories/typeRepository';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { HttpStatusCodes } from '@/helper/type';
import { getServerSession } from 'next-auth';

class TypeService {
  private typeRepository: TypeRepository;

  constructor(typeRepository: TypeRepository) {
    this.typeRepository = typeRepository;
  }

  async getAllTypes() {
    try {
      const session = await getServerSession(options);
      const userId = session?.user?.userId as string;

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const types = await this.typeRepository.getAllTypes();
      return { message: 'Success', data: { types }, status: HttpStatusCodes[200] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getTypeById(typeId: string) {
    try {
      const session = await getServerSession(options);
      const userId = session?.user?.userId as string;

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      const type = await this.typeRepository.getTypeById(typeId);
      return { message: 'Success', data: { type }, status: HttpStatusCodes[200] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }
}

export default TypeService;
