import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react';

export type DialogPortalProps = ComponentPropsWithoutRef<'div'> & HTMLAttributes<HTMLDivElement>;

export type FileImageType = {
  base64String: string;
  type: string;
  size: number;
};

export type StatisticType = {
  labelList: Array<Array<string>>;
  dataList: Array<Array<string>> | Array<Array<number>>;
  type: 'weekly' | 'monthly' | 'yearly' | string;
};

export type PieChartAmountType = {
  categoryName: string | undefined;
  categoryId?: string | undefined;
  _sum?: { amount: number | null };
};

export type TransactionDashboardType = {
  name: string;
  image: string | null;
  id: string;
};
export type ResponseDataType<TResponse> = {
  message: string | unknown;
  data?: TResponse;
  status:
    | {
        message: string;
        code: number;
      }
    | undefined;
};
