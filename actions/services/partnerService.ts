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
      const partner = await this.partnerRepository.createPartner({ ...data, userId });
      return { message: 'Partner Created', data: { partner }, status: HttpStatusCodes[201] };
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
      const partners = await this.partnerRepository.getAllPartnerByUser(userId);
      console.log({ partners });
      return { message: 'Success', data: { partners }, status: HttpStatusCodes[200] };
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

      const partner = await this.partnerRepository.getPartnerByName(userId, name);
      return { message: 'Success', data: { partner }, status: HttpStatusCodes[200] };
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

    const partner = await this.partnerRepository.getPartnerById(partnerId, userId);
    return { message: 'Success', data: { partner }, status: HttpStatusCodes[200] };
  }

  async updatePartner(data: PartnerUpdateType) {
    const session = await getServerSession(options);
    const userId = session?.user?.userId as string;

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    const partnerExist = await this.partnerRepository.getPartnerById(data.partnerId, userId);
    if (!partnerExist) {
      return { message: 'Invalid Partner or User', status: HttpStatusCodes[422] };
    }

    const partner = await this.partnerRepository.updatePartner({ ...data });
    return { message: 'Success', data: { partner }, status: HttpStatusCodes[200] };
  }

  async deletePartner(partnerId: string) {
    const session = await getServerSession(options);
    const userId = session?.user?.userId as string;

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    const partnerExist = await this.partnerRepository.getPartnerById(partnerId, userId);
    if (!partnerExist) {
      return { message: 'Invalid Partner or User', status: HttpStatusCodes[422] };
    }

    const partner = await this.partnerRepository.deletePartner(partnerId);
    return { message: 'Success', data: { partner }, status: HttpStatusCodes[200] };
  }
}

export default PartnerService;
