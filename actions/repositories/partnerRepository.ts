'use server';
import type { PartnerCreateType, PartnerUpdateType } from '@/actions/controller/partnerController';
import client from '@/helper/lib/prismadb';
import type { PrismaFilters } from '@/types/filter';

class PartnerRepository {
  async createPartner({
    typeId,
    address,
    contact,
    description,
    email,
    name,
    userId,
    image,
  }: PartnerCreateType & { userId: string }) {
    return await client.partner.create({
      data: { typeId, userId, name, deleted: false, contact, address, description, email, image },
    });
  }

  async getAllPartnerByUser(userId: string, pageSize: number, page: number, query?: string) {
    const queryFilter: PrismaFilters = [
      {
        name: {
          mode: 'insensitive',
          contains: query || '',
        },
      },
      {
        address: {
          mode: 'insensitive',
          contains: query || '',
        },
      },
      {
        email: {
          mode: 'insensitive',
          contains: query || '',
        },
      },
      {
        description: {
          mode: 'insensitive',
          contains: query || '',
        },
      },
    ];
    const queryCondition = {
      userId,
      deleted: false,
      OR: [...queryFilter],
    };
    const [partners, total] = await Promise.all([
      client.partner.findMany({
        where: { ...queryCondition },
        include: { type: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      client.partner.count({
        where: { ...queryCondition },
      }),
    ]);

    const totalPages = Math.ceil(total / pageSize);
    return {
      partners: partners,
      // .map((partner) => {
      //   const formatPartner = { ...partner, typeName: partner.type.name };
      //   return formatPartner;
      // })
      // .filter((partner) => {
      //   return (
      //     convertToLatin(partner.name?.toLowerCase()).includes(lowerQuery) ||
      //     convertToLatin(partner.email?.toLowerCase() || '').includes(lowerQuery) ||
      //     convertToLatin(partner.address?.toLowerCase() || '').includes(lowerQuery) ||
      //     convertToLatin(partner.description?.toLowerCase() || '').includes(lowerQuery)
      //   );
      // }),
      totalPages,
    };
  }

  async getPartnerByName(userId: string, name: string) {
    return await client.partner.findMany({ where: { userId, name, deleted: false } });
  }

  async getPartnerById(partnerId: string, userId: string) {
    return client.partner.findFirst({ where: { id: partnerId, userId, deleted: false } });
  }

  async getPartnerByType(typeId: string, userId: string) {
    return client.partner.findMany({ where: { typeId, userId, deleted: false } });
  }

  async updatePartner({ partnerId, typeId, name, contact, address, description, email, image }: PartnerUpdateType) {
    return await client.partner.update({
      where: { id: partnerId },
      data: { typeId, name, deleted: false, contact, address, description, email, image },
    });
  }

  async deletePartner(partnerId: string) {
    return await client.partner.update({
      where: { id: partnerId },
      data: { deleted: true },
    });
  }
}

export default PartnerRepository;
