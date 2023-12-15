import CommonTooltip from '@/components/CommonTooltip';
import emptyUser from '@/public/img/Avatar.png';
import { tailwindMerge } from '@/utils/helper';
import * as Avatar from '@radix-ui/react-avatar';
import type React from 'react';
import type { ReactNode } from 'react';
type CommonAvatarProps = {
  src?: string;
  alt?: string;
  className?: string;
  fallback?: ReactNode;
  label?: string;
  customLabel?: string;
  handleClick?: () => void;
};

const CommonAvatar: React.FC<CommonAvatarProps> = ({
  src,
  alt,
  className,
  fallback,
  label,
  customLabel,
  handleClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Avatar.Root
        onClick={() => {
          !!handleClick && handleClick();
        }}
        className={tailwindMerge(
          'inline-flex h-[60px] w-[60px] select-none items-center justify-center overflow-hidden rounded-full align-middle border ',
          className,
        )}
      >
        <Avatar.Image
          className="h-full w-full rounded-[inherit] object-cover hover:scale-110 transition-all duration-500 "
          src={src || emptyUser.src}
          alt={alt}
        />
        <Avatar.Fallback
          className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
          delayMs={600}
        >
          {fallback}
        </Avatar.Fallback>
      </Avatar.Root>
      {!!label && (
        <CommonTooltip content={label}>
          <p
            className={tailwindMerge(
              'text-base font-normal color-[#404040] w-[68px] text-ellipsis overflow-hidden whitespace-nowrap text-center',
              customLabel,
            )}
          >
            {label}
          </p>
        </CommonTooltip>
      )}
    </div>
  );
};

export default CommonAvatar;
