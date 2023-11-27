import type { PartnerCreateType, PartnerUpdateType } from '@/actions/controller/partnerController';
import client from '@/helper/lib/prismadb';
import { HttpStatusCodes } from '@/helper/type';

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
    const partner = await client.partner.create({
      data: { typeId, userId, name, deleted: false, contact, address, description, email },
    });
    return { message: 'Partner Created', data: { partner }, status: HttpStatusCodes[201] };
  }

  async getAllPartnerByUser(userId: string) {
    const partners = await client.partner.findMany({ where: { userId, deleted: false } });
    return { message: 'Success', data: { partners }, status: HttpStatusCodes[200] };
  }

  async getPartnerByName(userId: string, name: string) {
    const partner = await client.partner.findMany({ where: { userId, name, deleted: false } });
    return { message: 'Success', data: { partner }, status: HttpStatusCodes[200] };
  }

  async getPartnerById(partnerId: string, userId: string) {
    const partner = client.partner.findFirst({ where: { id: partnerId, userId, deleted: false } });
    return { message: 'Success', data: { partner }, status: HttpStatusCodes[200] };
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
    const partner = await client.partner.update({
      where: { id: partnerId, userId },
      data: { typeId, name, deleted: false, contact, address, description, email },
    });

    return { message: 'Success', data: { partner }, status: HttpStatusCodes[200] };
  }

  async deletePartner(partnerId: string, userId: string) {
    const partner = await client.partner.update({
      where: { id: partnerId, userId },
      data: { deleted: true },
    });

    return { message: 'Success', data: { partner }, status: HttpStatusCodes[200] };
  }
}

export default PartnerRepository;
