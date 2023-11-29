'use server';

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
    console.error('Error converting Base64 to Uint8Array:', error);
    return null;
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

    console.log('Uploaded Image:', result);

    return result?.secure_url;
  } catch (error) {
    throw new Error('Failed to upload image to Cloudinary');
  }
};

export const createTransaction = async (data: TransactionCreateType) => {
  try {
    uploadToCloudinary(data.invoiceImageUrl || '')
      .then((url) => {
        console.log('Uploaded image URL:', url);
      })
      .catch((error) => {
        console.error('Upload failed:', error.message);
      });
  } catch (error) {
    console.error(error);
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};
