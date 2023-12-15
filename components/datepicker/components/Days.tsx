/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useCallback, useContext } from 'react';

import { DatepickerContext } from '@/components/datepicker/const';
import { type DayProps, type Period } from '@/components/datepicker/type';
import { classNames, formatDate, nextMonth, previousMonth } from '@/components/datepicker/utils';

dayjs.extend(isBetween);

const Days = ({ calendarData, onClickPreviousDays, onClickDay, onClickNextDays }: DayProps) => {
  const { period, changePeriod, dayHover, changeDayHover, disabledDates } = useContext(DatepickerContext);
  const currentDateClass = useCallback(
    (item: number) => {
      const itemDate = `${item >= 10 ? item : '0' + item}-${calendarData.date.month() + 1}-${calendarData.date.year()}`;
      if (formatDate(dayjs()) === formatDate(dayjs(itemDate))) return 'text-celestial_blue-400';
      return '';
    },
    [calendarData.date],
  );

  const activeDateData = useCallback(
    (day: number) => {
      const fullDay = `${day}-${calendarData.date.month() + 1}-${calendarData.date.year()}`;
      let className = '';

      if (dayjs(fullDay).isSame(period.start) && dayjs(fullDay).isSame(period.end)) {
        className = 'bg-celestial_blue-400 text-white font-medium rounded-full';
      } else if (dayjs(fullDay).isSame(period.start)) {
        className = `bg-celestial_blue-400 text-white font-medium ${
          dayjs(fullDay).isSame(dayHover) && !period.end ? 'rounded-full' : 'rounded-l-full'
        }`;
      } else if (dayjs(fullDay).isSame(period.end)) {
        className = `bg-celestial_blue-400 text-white font-medium ${
          dayjs(fullDay).isSame(dayHover) && !period.start ? 'rounded-full' : 'rounded-r-full'
        }`;
      }

      return {
        active: dayjs(fullDay).isSame(period.start) || dayjs(fullDay).isSame(period.end),
        className: className,
      };
    },
    [calendarData.date, dayHover, period.end, period.start],
  );

  const hoverClassByDay = useCallback(
    (day: number) => {
      let className = currentDateClass(day);
      const fullDay = `${day >= 10 ? day : '0' + day}-${calendarData.date.month() + 1}-${calendarData.date.year()}`;

      if (period.start && period.end) {
        if (dayjs(fullDay).isBetween(period.start, period.end, 'day', '[)')) {
          return `bg-celestial_blue-500 ${currentDateClass(day)} dark:bg-white/10`;
        }
      }

      if (!dayHover) {
        return className;
      }

      if (period.start && dayjs(fullDay).isBetween(period.start, dayHover, 'day', '[)')) {
        className = `bg-celestial_blue-500 ${currentDateClass(day)} dark:bg-white/10`;
      }

      if (period.end && dayjs(fullDay).isBetween(dayHover, period.end, 'day', '[)')) {
        className = `bg-celestial_blue-500 ${currentDateClass(day)} dark:bg-white/10`;
      }

      if (dayHover === fullDay) {
        className = ` transition-all duration-400 text-white font-medium bg-celestial_blue-400 ${
          period.start ? 'rounded-r-full' : 'rounded-l-full'
        }`;
      }

      return className;
    },
    [calendarData.date, currentDateClass, dayHover, period.end, period.start],
  );

  const buttonClass = useCallback(
    (day: number, type: 'current' | 'next' | 'previous') => {
      const baseClass = 'flex items-center justify-center w-12 h-12 lg:w-10 lg:h-10';
      if (type === 'current') {
        return classNames(
          baseClass,
          !activeDateData(day).active ? hoverClassByDay(day) : activeDateData(day).className,
        );
      }
      return classNames(baseClass, 'text-gray-400');
    },
    [activeDateData, hoverClassByDay],
  );

  const checkIfHoverPeriodContainsDisabledPeriod = useCallback(
    (hoverPeriod: Period) => {
      if (!Array.isArray(disabledDates)) {
        return false;
      }
      for (let i = 0; i < disabledDates.length; i++) {
        if (
          dayjs(hoverPeriod.start).isBefore(disabledDates[i]?.startDate) &&
          dayjs(hoverPeriod.end).isAfter(disabledDates[i]?.endDate)
        ) {
          return true;
        }
      }
      return false;
    },
    [disabledDates],
  );

  const getMetaData = useCallback(() => {
    return {
      previous: previousMonth(calendarData.date),
      current: calendarData.date,
      next: nextMonth(calendarData.date),
    };
  }, [calendarData.date]);

  const hoverDay = useCallback(
    (day: number, type: string) => {
      const object = getMetaData();
      const newDate = object[type as keyof typeof object];
      const newHover = `${day >= 10 ? day : '0' + day}-${newDate.month() + 1}-${newDate.year()}`;

      if (period.start && !period.end) {
        const hoverPeriod = { ...period, end: newHover };
        if (dayjs(newHover).isBefore(dayjs(period.start))) {
          hoverPeriod.start = newHover;
          hoverPeriod.end = period.start;
          if (!checkIfHoverPeriodContainsDisabledPeriod(hoverPeriod)) {
            changePeriod({
              start: null,
              end: period.start,
            });
          }
        }
        if (!checkIfHoverPeriodContainsDisabledPeriod(hoverPeriod)) {
          changeDayHover(newHover);
        }
      }

      if (!period.start && period.end) {
        const hoverPeriod = { ...period, start: newHover };
        if (dayjs(newHover).isAfter(dayjs(period.end))) {
          hoverPeriod.start = period.end;
          hoverPeriod.end = newHover;
          if (!checkIfHoverPeriodContainsDisabledPeriod(hoverPeriod)) {
            changePeriod({
              start: period.end,
              end: null,
            });
          }
        }
        if (!checkIfHoverPeriodContainsDisabledPeriod(hoverPeriod)) {
          changeDayHover(newHover);
        }
      }
    },
    [changeDayHover, changePeriod, checkIfHoverPeriodContainsDisabledPeriod, getMetaData, period],
  );

  const handleClickDay = useCallback(
    (day: number, type: 'previous' | 'current' | 'next') => {
      const continueClick = () => {
        if (type === 'previous') {
          onClickPreviousDays(day);
        }
        if (type === 'current') {
          onClickDay(day);
        }
        if (type === 'next') {
          onClickNextDays(day);
        }
      };
      if (disabledDates?.length) {
        const object = getMetaData();
        const newDate = object[type as keyof typeof object];
        const clickDay = `${day >= 10 ? day : '0' + day}-${newDate.month() + 1}-${newDate.year()}`;
        if (period.start && !period.end) {
          dayjs(clickDay).isSame(dayHover) && continueClick();
        } else if (!period.start && period.end) {
          dayjs(clickDay).isSame(dayHover) && continueClick();
        } else {
          continueClick();
        }
      } else {
        continueClick();
      }
    },
    [
      dayHover,
      disabledDates?.length,
      getMetaData,
      onClickDay,
      onClickNextDays,
      onClickPreviousDays,
      period.end,
      period.start,
    ],
  );

  return (
    <div className="grid grid-cols-7 gap-y-0.5 my-1">
      {calendarData.days.previous.map((item, index) => (
        <button
          type="button"
          key={index}
          className={`${buttonClass(item, 'previous')}`}
          onClick={() => handleClickDay(item, 'previous')}
          onMouseOver={() => {
            hoverDay(item, 'previous');
          }}
        >
          {item}
        </button>
      ))}

      {calendarData.days.current.map((item, index) => (
        <button
          type="button"
          key={index}
          className={`${buttonClass(item, 'current')}`}
          onClick={() => handleClickDay(item, 'current')}
          onMouseOver={() => {
            hoverDay(item, 'current');
          }}
        >
          {item}
        </button>
      ))}

      {calendarData.days.next.map((item, index) => (
        <button
          type="button"
          key={index}
          className={`${buttonClass(item, 'next')}`}
          onClick={() => handleClickDay(item, 'next')}
          onMouseOver={() => {
            hoverDay(item, 'next');
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Days;
