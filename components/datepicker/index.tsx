import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Calendar from '@/components/datepicker/components';
import Input from '@/components/datepicker/components/Input';
import { DatepickerContext } from '@/components/datepicker/const';
import { type DatepickerType, type Period } from '@/components/datepicker/type';
import useOnClickOutside, { Arrow, convertToDDMMYYYY, formatDate, nextMonth, previousMonth } from './utils';

const CommonDatePicker = ({
  value = { startDate: '', endDate: '' },
  onChange,
  disabled = false,
  inputId,
  classNames = undefined,
  asSingle = false,
  errors,
  name,
}: DatepickerType) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const calendarContainerRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const [firstDate, setFirstDate] = useState<dayjs.Dayjs>(dayjs());
  const [secondDate, setSecondDate] = useState<dayjs.Dayjs>(nextMonth(firstDate));
  const [period, setPeriod] = useState<Period>({
    start: null,
    end: null,
  });
  const [dayHover, setDayHover] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [inputRef, setInputRef] = useState(React.createRef<HTMLInputElement>());

  const hideDatepicker = useCallback(() => {
    const div = calendarContainerRef.current;
    const arrow = arrowRef.current;
    const handleTransitionEnd = () => {
      div?.removeEventListener('transitionend', handleTransitionEnd);
      div?.classList.add('hidden');
    };
    if (arrow && div && div.classList.contains('block')) {
      div.addEventListener('transitionend', handleTransitionEnd);
      div.classList.remove('block');
      div.classList.remove('translate-y-0');
      div.classList.remove('opacity-1');
      div.classList.add('translate-y-4');
      div.classList.add('opacity-0');
    }
  }, []);

  useOnClickOutside(containerRef, () => {
    const container = containerRef.current;
    if (container) {
      hideDatepicker();
    }
  });

  const firstGotoDate = useCallback(
    (date: dayjs.Dayjs) => {
      const newDate = dayjs(formatDate(date));
      const reformatDate = dayjs(formatDate(secondDate));
      if (newDate.isSame(reformatDate) || newDate.isAfter(reformatDate)) {
        setSecondDate(nextMonth(date));
      }
      setFirstDate(date);
    },
    [secondDate],
  );

  const previousMonthFirst = useCallback(() => {
    setFirstDate(previousMonth(firstDate));
  }, [firstDate]);

  const nextMonthFirst = useCallback(() => {
    firstGotoDate(nextMonth(firstDate));
  }, [firstDate, firstGotoDate]);

  const changeFirstMonth = useCallback(
    (month: number) => {
      firstGotoDate(dayjs(`${firstDate.year()}-${month < 10 ? '0' : ''}${month}-01`));
    },
    [firstDate, firstGotoDate],
  );

  const changeFirstYear = useCallback(
    (year: number) => {
      firstGotoDate(dayjs(`${year}-${firstDate.month() + 1}-01`));
    },
    [firstDate, firstGotoDate],
  );

  const secondGotoDate = useCallback(
    (date: dayjs.Dayjs) => {
      const newDate = dayjs(formatDate(date, 'YYYY-MM-DD'));
      const reformatDate = dayjs(formatDate(firstDate, 'YYYY-MM-DD'));
      if (newDate.isSame(reformatDate) || newDate.isBefore(reformatDate)) {
        setFirstDate(previousMonth(date));
      }
      setSecondDate(date);
    },
    [firstDate],
  );

  const previousMonthSecond = useCallback(() => {
    secondGotoDate(previousMonth(secondDate));
  }, [secondDate, secondGotoDate]);

  const nextMonthSecond = useCallback(() => {
    setSecondDate(nextMonth(secondDate));
  }, [secondDate]);

  const changeSecondMonth = useCallback(
    (month: number) => {
      secondGotoDate(dayjs(`${secondDate.year()}-${month < 10 ? '0' : ''}${month}-01`));
    },
    [secondDate, secondGotoDate],
  );

  const changeSecondYear = useCallback(
    (year: number) => {
      secondGotoDate(dayjs(`${year}-${secondDate.month() + 1}-01`));
    },
    [secondDate, secondGotoDate],
  );

  useEffect(() => {
    if (value) {
      let startDate: dayjs.Dayjs | null = null;
      let endDate: dayjs.Dayjs | null = null;
      if (typeof value === 'object' && 'startDate' in value && 'endDate' in value) {
        startDate = dayjs(value.startDate);
        endDate = dayjs(value.endDate);
      } else if (typeof value === 'string') {
        const formatValue = convertToDDMMYYYY(value);
        const date = dayjs(formatValue, 'DD-MM-YYYY');
        if (date.isValid()) {
          startDate = endDate = date;
        }
      }
      if (startDate && endDate) {
        const validDate = startDate.isValid() && endDate.isValid();
        const condition = validDate && (startDate.isSame(endDate) || startDate.isBefore(endDate));
        if (condition) {
          setPeriod({
            start: startDate.toString(),
            end: endDate.toString(),
          });
          setInputText(
            `${startDate ? formatDate(dayjs(startDate, 'DD-MM-YYYY'), 'DD-MM-YYYY') : value}${
              asSingle ? '' : ` ~ ${formatDate(dayjs(endDate, 'DD-MM-YYYY'), 'DD-MM-YYYY')}`
            }`,
          );
        }
      }
    }
    if (value && typeof value !== 'string' && value.startDate === null && value.endDate === null) {
      setPeriod({
        start: null,
        end: null,
      });
      setInputText('');
    }
  }, [asSingle, value]);

  useEffect(() => {
    if (value) {
      let startDate: dayjs.Dayjs | null = null;
      let endDate: dayjs.Dayjs | null = null;
      if (typeof value === 'object' && 'startDate' in value && 'endDate' in value) {
        startDate = dayjs(value.startDate);
        endDate = dayjs(value.endDate);
      } else if (typeof value === 'string') {
        const formatValue = convertToDDMMYYYY(value);
        const date = dayjs(formatValue, 'DD-MM-YYYY');
        if (date.isValid()) {
          startDate = endDate = date;
        }
      }
      if (startDate && dayjs(startDate).isValid()) {
        setFirstDate(dayjs(startDate));
        if (!asSingle) {
          if (endDate && dayjs(endDate).isValid() && dayjs(endDate).startOf('month').isAfter(dayjs(startDate))) {
            setSecondDate(dayjs(endDate));
          } else {
            setSecondDate(nextMonth(dayjs(startDate)));
          }
        }
      }
    }
  }, [asSingle, value]);

  const contextValues = useMemo(() => {
    return {
      asSingle,
      primaryColor: 'blue',
      calendarContainer: calendarContainerRef,
      arrowContainer: arrowRef,
      hideDatepicker,
      period,
      changePeriod: (newPeriod: Period) => setPeriod(newPeriod),
      dayHover,
      changeDayHover: (newDay: string | null) => setDayHover(newDay),
      inputText,
      changeInputText: (newText: string) => setInputText(newText),
      updateFirstDate: (newDate: dayjs.Dayjs) => firstGotoDate(newDate),
      changeDatepickerValue: onChange,
      value,
      disabled,
      inputId,
      classNames,
      onChange,
      input: inputRef,
    };
  }, [
    asSingle,
    hideDatepicker,
    period,
    dayHover,
    inputText,
    onChange,
    value,
    disabled,
    inputId,
    classNames,
    inputRef,
    firstGotoDate,
  ]);

  return (
    <DatepickerContext.Provider value={contextValues}>
      <div ref={containerRef}>
        <Input
          setContextRef={setInputRef}
          errors={errors}
          name={name}
        />
        <div
          className="transition-all ease-out duration-300 absolute z-10 mt-[1px] text-sm lg:text-xs 2xl:text-sm translate-y-4 opacity-0 hidden"
          ref={calendarContainerRef}
        >
          <Arrow ref={arrowRef} />

          <div className="mt-2.5 shadow-sm border border-gray-300 px-1 py-0.5 bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600 rounded-lg">
            <div className="flex flex-col lg:flex-row py-2">
              <div
                className={`flex items-stretch flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-1.5 "md:pl-1"
                                } pr-2 lg:pr-1`}
              >
                <Calendar
                  date={firstDate}
                  onClickPrevious={previousMonthFirst}
                  onClickNext={nextMonthFirst}
                  changeMonth={changeFirstMonth}
                  changeYear={changeFirstYear}
                />
                {!asSingle && (
                  <Calendar
                    date={secondDate}
                    onClickPrevious={previousMonthSecond}
                    onClickNext={nextMonthSecond}
                    changeMonth={changeSecondMonth}
                    changeYear={changeSecondYear}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DatepickerContext.Provider>
  );
};

export default CommonDatePicker;
