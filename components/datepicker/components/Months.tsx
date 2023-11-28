import dayjs from 'dayjs';

import { MONTHS } from '@/components/datepicker/const';
import type { MonthProps } from '@/components/datepicker/type';
import { RoundedButton } from '@/components/datepicker/utils';

const Months = ({ currentMonth, clickMonth }: MonthProps) => {
  return (
    <div className="w-full grid grid-cols-2 gap-2 mt-2">
      {MONTHS.map((item) => (
        <RoundedButton
          key={item}
          padding="py-3"
          onClick={() => {
            clickMonth(item);
          }}
          active={currentMonth === item}
        >
          <>{dayjs(`2022-${item}-01`).format('MMM')}</>
        </RoundedButton>
      ))}
    </div>
  );
};

export default Months;
