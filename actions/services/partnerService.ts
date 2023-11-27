import type { PartnerCreateType, PartnerUpdateType } from './../controller/partnerController';
// services/partnerService.ts
import type PartnerRepository from '@/actions/repositories/partnerRepository';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { HttpStatusCodes } from '../../helper/type';

class PartnerService {
  private partnerRepository: PartnerRepository;

  constructor(partnerRepository: PartnerRepository) {
    this.partnerRepository = partnerRepository;
  }

  async createPartner(data: PartnerCreateType) {
    try {
      const session = await getServerSession(options);
      const userId = session?.user?.userId as string;
      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      return await this.partnerRepository.createPartner({ ...data, userId });
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getAllPartnerByUser() {
    try {
      const session = await getServerSession(options);
      const userId = session?.user?.userId as string;

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }
      return await this.partnerRepository.getAllPartnerByUser(userId);
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getPartnerByName(name: string) {
    try {
      const session = await getServerSession(options);
      const userId = session?.user?.userId as string;

      if (!userId) {
        return { message: 'User is not valid', status: HttpStatusCodes[401] };
      }

      return await this.partnerRepository.getPartnerByName(userId, name);
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  async getPartnerById(partnerId: string) {
    const session = await getServerSession(options);
    const userId = session?.user?.userId as string;

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    return await this.partnerRepository.getPartnerById(partnerId, userId);
  }

  async updatePartner(data: PartnerUpdateType) {
    const session = await getServerSession(options);
    const userId = session?.user?.userId as string;

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    return await this.partnerRepository.updatePartner({ ...data, userId });
  }

  async deletePartner(partnerId: string) {
    const session = await getServerSession(options);
    const userId = session?.user?.userId as string;

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }
    return await this.partnerRepository.deletePartner(partnerId, userId);
  }
}

export default PartnerService;
