import type { PartnerCreateType, PartnerUpdateType } from '@/actions/controller/partnerController';
import client from '@/helper/lib/prismadb';
import type { Partner } from '@prisma/client';

class PartnerRepository {
  async createPartner({
    typeId,
    address,
    contact,
    description,
    email,
    name,
    userId,
  }: PartnerCreateType & { userId: string }) {
    return await client.partner.create({
      data: { typeId, userId, name, deleted: false, contact, address, description, email },
    });
  }

  async getAllPartnerByUser(userId: string) {
    console.log({ userId });
    const a: Partner[] = await client.partner.findMany();
    console.log(a);
    return await client.partner.findMany({ where: { userId, deleted: false } });
  }

  async getPartnerByName(userId: string, name: string) {
    return await client.partner.findMany({ where: { userId, name, deleted: false } });
  }

  async getPartnerById(partnerId: string, userId: string) {
    return client.partner.findFirst({ where: { id: partnerId, userId, deleted: false } });
  }

  async updatePartner({ partnerId, typeId, name, contact, address, description, email }: PartnerUpdateType) {
    return await client.partner.update({
      where: { id: partnerId },
      data: { typeId, name, deleted: false, contact, address, description, email },
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
