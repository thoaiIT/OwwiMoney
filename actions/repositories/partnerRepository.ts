import type { PartnerCreateType, PartnerUpdateType } from '@/actions/controller/partnerController';
import client from '@/helper/lib/prismadb';

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
    return await client.partner.findMany({ where: { userId, deleted: false } });
  }

  async getPartnerByName(userId: string, name: string) {
    return await client.partner.findMany({ where: { userId, name, deleted: false } });
  }

  async getPartnerById(partnerId: string, userId: string) {
    return client.partner.findFirst({ where: { id: partnerId, userId, deleted: false } });
  }

  async updatePartner({
    partnerId,
    typeId,
    name,
    contact,
    address,
    description,
    email,
    userId,
  }: PartnerUpdateType & { userId: string }) {
    return await client.partner.update({
      where: { id: partnerId, userId },
      data: { typeId, name, deleted: false, contact, address, description, email },
    });
  }

  async deletePartner(partnerId: string, userId: string) {
    return await client.partner.update({
      where: { id: partnerId, userId },
      data: { deleted: true },
    });
  }
}

export default PartnerRepository;
