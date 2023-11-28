import type { YearProps } from '@/components/datepicker/type';
import { RoundedButton, generateArrayNumber } from '@/components/datepicker/utils';

const Years = ({ year, currentYear, clickYear }: YearProps) => {
  const startDate = year;
  const endDate = year + 11;
  return (
    <div className="w-full grid grid-cols-2 gap-2 mt-2">
      {generateArrayNumber(startDate, endDate).map((item, index) => (
        <RoundedButton
          key={index}
          padding="py-3"
          onClick={() => {
            clickYear(item);
          }}
          active={currentYear === item}
        >
          <>{item}</>
        </RoundedButton>
      ))}
    </div>
  );
};

export default Years;
