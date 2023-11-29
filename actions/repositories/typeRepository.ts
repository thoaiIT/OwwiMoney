import client from '@/helper/lib/prismadb';

class TypeRepository {
  async getAllTypes() {
    return await client.type.findMany();
  }
}

export default TypeRepository;
