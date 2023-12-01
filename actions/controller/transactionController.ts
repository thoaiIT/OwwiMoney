'use server';
import TransactionRepository from '@/actions/repositories/transactionRepository';
import TransactionService from '@/actions/services/transactionService';
import { HttpStatusCodes } from '@/helper/type';
import type { Transaction } from '@prisma/client';
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type TransactionCreateType = Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'createdDate'> & {
  createdDate: string;
};

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(transactionRepository);

const base64ToUint8Array = (base64String: string) => {
  const base64WithoutPrefix = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

  try {
    const binaryString = atob(base64WithoutPrefix);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  } catch (error) {
    return error;
  }
};

const uploadToCloudinary = async (base64String: string) => {
  try {
    const uint8Array = base64ToUint8Array(base64String);

    const result: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        })
        .end(uint8Array);
    });

    return result?.secure_url;
  } catch (error) {
    throw new Error('Failed to upload image to Cloudinary');
  }
};

export const createTransaction = async (data: TransactionCreateType) => {
  const result = uploadToCloudinary(data.invoiceImageUrl || '')
    .then(async (url) => {
      try {
        const result = await transactionService.createTransaction({ ...data, invoiceImageUrl: url as string });
        return result;
      } catch (error) {
        return { message: 'Cannot create new transaction!!', status: HttpStatusCodes[500] };
      }
    })
    .catch((error) => {
      console.log({ error });
      return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
    });
  return result;
};
