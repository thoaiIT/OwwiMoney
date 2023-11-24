import dayjs from 'dayjs';
import React from 'react';

import { MONTHS } from '@/components/datepicker/const';
import { RoundedButton } from '@/components/datepicker/utils';

interface Props {
  currentMonth: number;
  clickMonth: (month: number) => void;
}

const Months: React.FC<Props> = ({ currentMonth, clickMonth }) => {
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
