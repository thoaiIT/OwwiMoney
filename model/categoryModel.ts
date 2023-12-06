import type { FileType } from '@/app/(dashboard)/transactions/TransactionsDialog';
import { IsImage, MaxSize } from '@/utils/validate/decorators';
import { IsNotEmpty } from 'class-validator';

export class CategoryModel {
  @IsNotEmpty({ message: 'Category name is required' })
  name: string | undefined;

  @IsNotEmpty({ message: 'Type is required' })
  type: string | undefined;

  description?: string | null;
}

export class CategoryModelReceive extends CategoryModel {
  @IsImage()
  @MaxSize(10000000)
  categoryImage?: FileType | null;
}

export class CategoryModelUpload extends CategoryModel {
  categoryImage?: string | null;
}
