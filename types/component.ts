import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react';

export type DialogPortalProps = ComponentPropsWithoutRef<'div'> & HTMLAttributes<HTMLDivElement>;

export type FileImageType = {
  base64String: string;
  type: string;
  size: number;
};
