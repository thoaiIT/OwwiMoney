'use server';
import PartnerRepository from '@/actions/repositories/partnerRepository';
import PartnerService from '@/actions/services/partnerService';
import { HttpStatusCodes } from '@/helper/type';
import type { Partner } from '@prisma/client';

export type PartnerCreateType = Pick<Partner, 'typeId' | 'name' | 'contact' | 'address' | 'description' | 'email'>;
export type PartnerUpdateType = PartnerCreateType & { partnerId: string };

const partnerRepository = new PartnerRepository();
const partnerService = new PartnerService(partnerRepository);

export const createPartner = async (data: PartnerCreateType) => {
  try {
    const result = await partnerService.createPartner(data);
    return result;
  } catch (error) {
    console.error(error);
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getAllPartnerByUser = async (pageSize: number, page: number, query?: string) => {
  try {
    return await partnerService.getAllPartnerByUser(pageSize, page, query);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getPartnerByName = async (name: string) => {
  try {
    return await partnerService.getPartnerByName(name);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getPartnerById = async (partnerId: string) => {
  try {
    return await partnerService.getPartnerById(partnerId);
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

export const updatePartner = async (data: PartnerUpdateType) => {
  try {
    return await partnerService.updatePartner(data);
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

export const deletePartner = async (partnerId: string) => {
  try {
    return await partnerService.deletePartner(partnerId);
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};

export const getPartnerByType = async (typeId: string) => {
  try {
    return await partnerService.getPartnerByType(typeId);
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};
