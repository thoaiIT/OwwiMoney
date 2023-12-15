import { DAYS } from '@/components/datepicker/const';
import { shortString, ucFirst } from '@/components/datepicker/utils';
import dayjs from 'dayjs';

const Week = () => {
  return (
    <div className="grid grid-cols-7 border-b border-gray-300 dark:border-gray-700 py-2">
      {DAYS.map((item) => (
        <div
          key={item}
          className="text-gray-500 text-center"
        >
          {ucFirst(shortString(dayjs(`${6 + item}-11-2022`).format('ddd')))}
        </div>
      ))}
    </div>
  );
};

export default Week;
