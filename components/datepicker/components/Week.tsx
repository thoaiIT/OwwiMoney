import { DAYS } from '@/components/datepicker/const';
import { shortString, ucFirst } from '@/components/datepicker/utils';
import dayjs from 'dayjs';
import React from 'react';

const Week: React.FC = () => {
  return (
    <div className="grid grid-cols-7 border-b border-gray-300 dark:border-gray-700 py-2">
      {DAYS.map((item) => (
        <div
          key={item}
          className=" text-gray-500 text-center"
        >
          {ucFirst(shortString(dayjs(`2022-11-${6 + item}`).format('ddd')))}
        </div>
      ))}
    </div>
  );
};

export default Week;
