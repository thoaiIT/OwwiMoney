import client from '@/helper/lib/prismadb';
import { HttpStatusCodes } from '@/helper/type';

const getAllType = async () => {
  const types = await client.type.findMany();
  return { message: 'User Created', data: { types }, status: HttpStatusCodes[200] };
};
