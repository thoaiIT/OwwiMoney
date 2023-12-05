import client from '@/helper/lib/prismadb';

class TypeRepository {
  async getAllTypes() {
    return await client.type.findMany();
  }

  async getTypeById(typeID: string) {
    return await client.type.findFirst({
      where: {
        id: typeID,
      },
    });
  }
}

export default TypeRepository;
