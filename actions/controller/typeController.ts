'use server';

import TypeRepository from '@/actions/repositories/typeRepository';
import TypeService from '@/actions/services/typeService';
import { HttpStatusCodes } from '@/helper/type';

const typeRepository = new TypeRepository();
const typeService = new TypeService(typeRepository);

export const getAllTypes = async () => {
  try {
    const allTypes = await typeService.getAllTypes();
    return allTypes;
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getTypeById = async (typeId: string) => {
  try {
    const type = await typeService.getTypeById(typeId);
    return type;
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};
