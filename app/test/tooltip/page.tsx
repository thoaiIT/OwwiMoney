'use client';
import CommonTooltip from '@/components/CommonTooltip';
import { CommonButton } from '@/components/button';

export default function page() {
  return (
    <div>
      <div>Tooltip</div>
      <CommonTooltip content="hihihihihihih">
        <CommonButton>Hehe</CommonButton>
      </CommonTooltip>
    </div>
  );
}
