import { options } from '@/app/api/auth/[...nextauth]/options';
import client from '@/helper/lib/prismadb';
import { HttpStatusCodes } from '@/helper/type';
import { getServerSession } from 'next-auth';

export const createPartner = async (
  typeId: string,
  partnerName: string,
  contact?: string,
  address?: string,
  description?: string,
  email?: string,
) => {
  try {
    const types = await client.type.findMany();
    const session = await getServerSession(options);
    const userId = session?.user?.userId as string;

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    await client.partner.create({
      data: { typeId, userId, name: partnerName, deleted: false, contact, address, description, email },
    });
    return { message: 'User Created', data: { types }, status: HttpStatusCodes[200] };
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

export const getAllPartnerByUser = async () => {
  try {
    const types = await client.type.findMany();
    const session = await getServerSession(options);
    const userId = session?.user?.userId as string;

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    await client.partner.findMany({ where: { userId, deleted: false } });
    return { message: 'Success', data: { types }, status: HttpStatusCodes[200] };
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

export const getPartnerByName = async (name: string) => {
  try {
    const types = await client.type.findMany();
    const session = await getServerSession(options);
    const userId = session?.user?.userId as string;

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    await client.partner.findMany({ where: { userId, name, deleted: false } });
    return { message: 'Success', data: { types }, status: HttpStatusCodes[200] };
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

export const getPartnerById = async (partnerId: string) => {
  try {
    const types = await client.type.findMany();
    const session = await getServerSession(options);
    const userId = session?.user?.userId as string;

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    await client.partner.findFirst({ where: { id: partnerId, userId, deleted: false } });
    return { message: 'Success', data: { types }, status: HttpStatusCodes[200] };
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

export const updatePartner = async (
  partnerId: string,
  typeId: string,
  partnerName: string,
  contact?: string,
  address?: string,
  description?: string,
  email?: string,
) => {
  try {
    const types = await client.type.findMany();
    const session = await getServerSession(options);
    const userId = session?.user?.userId as string;

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    await client.partner.update({
      where: { id: partnerId, userId },
      data: { typeId, name: partnerName, deleted: false, contact, address, description, email },
    });

    return { message: 'Success', data: { types }, status: HttpStatusCodes[200] };
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

export const deletePartner = async (partnerId: string) => {
  try {
    const types = await client.type.findMany();
    const session = await getServerSession(options);
    const userId = session?.user?.userId as string;

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    await client.partner.update({
      where: { id: partnerId, userId },
      data: { deleted: true },
    });

    return { message: 'Success', data: { types }, status: HttpStatusCodes[200] };
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};
