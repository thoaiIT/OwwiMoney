import Days from '@/components/datepicker/components/Days';
import Months from '@/components/datepicker/components/Months';
import Week from '@/components/datepicker/components/Week';
import Years from '@/components/datepicker/components/Year';
import { DatepickerContext } from '@/components/datepicker/const';
import { type CalendarProps } from '@/components/datepicker/type';
import {
  RoundedButton,
  formatDate,
  getDaysInMonth,
  getFirstDayInMonth,
  getFirstDaysInMonth,
  getLastDaysInMonth,
  getNumberOfDay,
  nextMonth,
  previousMonth,
} from '@/components/datepicker/utils';
import dayjs from 'dayjs';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';

const Calendar = ({ date, onClickPrevious, onClickNext, changeMonth, changeYear }: CalendarProps) => {
  const { period, changePeriod, changeDayHover, changeDatepickerValue, hideDatepicker, asSingle, input } =
    useContext(DatepickerContext);
  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [year, setYear] = useState(date.year());

  const previous = useCallback(() => {
    return getLastDaysInMonth(previousMonth(date), getNumberOfDay(getFirstDayInMonth(date).ddd));
  }, [date]);

  const current = useCallback(() => {
    return getDaysInMonth(formatDate(date));
  }, [date]);

  const next = useCallback(() => {
    return getFirstDaysInMonth(previousMonth(date), 42 - (previous().length + current().length));
  }, [current, date, previous]);

  const hideMonths = useCallback(() => {
    showMonths && setShowMonths(false);
  }, [showMonths]);

  const hideYears = useCallback(() => {
    showYears && setShowYears(false);
  }, [showYears]);

  const clickMonth = useCallback(
    (month: number) => {
      const handleMonthClick = () => {
        changeMonth(month);
        setShowMonths(!showMonths);
      };
      requestAnimationFrame(() => {
        requestAnimationFrame(handleMonthClick);
      });
    },
    [changeMonth, showMonths],
  );

  const clickYear = useCallback(
    (year: number) => {
      const handleYearClick = () => {
        changeYear(year);
        setShowYears(!showYears);
      };
      requestAnimationFrame(() => {
        requestAnimationFrame(handleYearClick);
      });
    },
    [changeYear, showYears],
  );

  const clickDay = useCallback(
    (day: number, month = date.month() + 1, year = date.year()) => {
      const fullDay = `${day}-${month}-${year}`;
      let newStart;
      let newEnd = null;

      const chosePeriod = (start: string, end: string) => {
        const ipt = input?.current;
        changeDatepickerValue(
          {
            startDate: dayjs(start).format('DD-MM-YYYY'),
            endDate: dayjs(end).format('DD-MM-YYYY'),
          },
          ipt,
        );
        hideDatepicker();
      };

      if (period.start && period.end) {
        if (changeDayHover) {
          changeDayHover(null);
        }
        changePeriod({
          start: null,
          end: null,
        });
      }

      if ((!period.start && !period.end) || (period.start && period.end)) {
        if (!period.start && !period.end) {
          changeDayHover(fullDay);
        }
        newStart = fullDay;
        if (asSingle) {
          newEnd = fullDay;
          chosePeriod(fullDay, fullDay);
        }
      } else {
        if (period.start && !period.end) {
          const condition = dayjs(fullDay).isSame(dayjs(period.start)) || dayjs(fullDay).isAfter(dayjs(period.start));
          newStart = condition ? period.start : fullDay;
          newEnd = condition ? fullDay : period.start;
        } else {
          const condition = dayjs(fullDay).isSame(dayjs(period.end)) || dayjs(fullDay).isBefore(dayjs(period.end));
          newStart = condition ? fullDay : period.start;
          newEnd = condition ? period.end : fullDay;
        }
      }

      if (!(newEnd && newStart)) {
        changePeriod({
          start: newStart,
          end: newEnd,
        });
      }
    },
    [
      asSingle,
      changeDatepickerValue,
      changeDayHover,
      changePeriod,
      date,
      hideDatepicker,
      period.end,
      period.start,
      input,
    ],
  );

  const clickPreviousDays = useCallback(
    (day: number) => {
      const newDate = previousMonth(date);
      clickDay(day, newDate.month() + 1, newDate.year());
      onClickPrevious();
    },
    [clickDay, date, onClickPrevious],
  );

  const clickNextDays = useCallback(
    (day: number) => {
      const newDate = nextMonth(date);
      clickDay(day, newDate.month() + 1, newDate.year());
      onClickNext();
    },
    [clickDay, date, onClickNext],
  );

  useEffect(() => {
    setYear(date.year());
  }, [date]);

  const calendarData = useMemo(() => {
    return {
      date: date,
      days: {
        previous: previous(),
        current: current(),
        next: next(),
      },
    };
  }, [current, date, next, previous]);

  return (
    <div className="w-full">
      <div className="flex items-center space-x-1.5 border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1.5">
        {!showMonths && !showYears && (
          <div className="flex-none">
            <RoundedButton
              roundedFull
              onClick={onClickPrevious}
            >
              <MdOutlineArrowBackIosNew className="h-5 w-5" />
            </RoundedButton>
          </div>
        )}

        {showYears && (
          <div className="flex-none">
            <RoundedButton
              roundedFull
              onClick={() => {
                setYear(year - 12);
              }}
            >
              <MdOutlineKeyboardDoubleArrowLeft className="h-5 w-5" />
            </RoundedButton>
          </div>
        )}

        <div className="flex flex-1 items-center space-x-1.5">
          <div className="w-1/2">
            <RoundedButton
              onClick={() => {
                setShowMonths(!showMonths);
                hideYears();
              }}
            >
              <>{calendarData.date.format('MMM')}</>
            </RoundedButton>
          </div>

          <div className="w-1/2">
            <RoundedButton
              onClick={() => {
                setShowYears(!showYears);
                hideMonths();
              }}
            >
              <>{calendarData.date.year()}</>
            </RoundedButton>
          </div>
        </div>

        {showYears && (
          <div className="flex-none">
            <RoundedButton
              roundedFull
              onClick={() => {
                setYear(year + 12);
              }}
            >
              <MdOutlineKeyboardDoubleArrowRight className="h-5 w-5" />
            </RoundedButton>
          </div>
        )}

        {!showMonths && !showYears && (
          <div className="flex-none">
            <RoundedButton
              roundedFull
              onClick={onClickNext}
            >
              <MdOutlineArrowForwardIos className="h-5 w-5" />
            </RoundedButton>
          </div>
        )}
      </div>

      <div className="px-0.5 sm:px-2 mt-0.5 min-h-[285px]">
        {showMonths && (
          <Months
            currentMonth={calendarData.date.month() + 1}
            clickMonth={clickMonth}
          />
        )}

        {showYears && (
          <Years
            year={year}
            currentYear={calendarData.date.year()}
            clickYear={clickYear}
          />
        )}

        {!showMonths && !showYears && (
          <>
            <Week />
            <Days
              calendarData={calendarData}
              onClickPreviousDays={clickPreviousDays}
              onClickDay={clickDay}
              onClickNextDays={clickNextDays}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Calendar;
