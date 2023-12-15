import type { Button } from '@/components/datepicker/type';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import React, { useCallback, useEffect } from 'react';

dayjs.extend(weekday);
dayjs.extend(customParseFormat);

export function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(' ');
}

export function generateArrayNumber(start = 0, end = 0) {
  const array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}

export function shortString(value: string, limit = 3) {
  return value.slice(0, limit);
}

export function ucFirst(value: string) {
  return `${value[0]?.toUpperCase()}${value.slice(1, value.length)}`;
}

export function formatDate(date: dayjs.Dayjs, format = 'DD-MM-YYYY') {
  return date.format(format);
}

export function parseFormattedDate(date: string, format = 'DD-MM-YYYY') {
  return dayjs(date, format);
}

export function getFirstDayInMonth(date: string | dayjs.Dayjs) {
  return {
    ddd: formatDate(dayjs(date).startOf('month'), 'ddd'),
    basic: formatDate(dayjs(date).startOf('month')),
    object: dayjs(date).startOf('month'),
  };
}

export function getLastDayInMonth(date: string) {
  return {
    ddd: formatDate(dayjs(date).endOf('month'), 'ddd'),
    basic: formatDate(dayjs(date).endOf('month')),
    object: dayjs(date).endOf('month'),
  };
}

export function getDaysInMonth(date: string | dayjs.Dayjs) {
  if (!isNaN(dayjs(date).daysInMonth())) {
    return [...generateArrayNumber(1, dayjs(date).daysInMonth())];
  }
  return [];
}

export function nextMonth(date: dayjs.Dayjs) {
  return date
    .date(1)
    .hour(0)
    .minute(0)
    .second(0)
    .month(date.month() + 1);
}

export function previousMonth(date: dayjs.Dayjs) {
  return date
    .date(1)
    .hour(0)
    .minute(0)
    .second(0)
    .month(date.month() - 1);
}

export function getFirstElementsInArray(array: number[] = [], size = 0) {
  return array.slice(0, size);
}

export function getLastElementsInArray(array: number[] = [], size = 0) {
  const result: number[] = [];
  if (Array.isArray(array) && size > 0) {
    if (size >= array.length) {
      return array;
    }

    let y = array.length - 1;
    for (let i = 0; i < size; i++) {
      result.push(array[y] || 0);
      y--;
    }
  }
  return result.reverse();
}

export function getNumberOfDay(dayString: string, startWeekOn?: string | null | undefined): number {
  let number = 0;

  let startDateModifier = 0;

  if (startWeekOn) {
    switch (startWeekOn) {
      case 'mon':
        startDateModifier = 6;
        break;
      case 'tue':
        startDateModifier = 5;
        break;
      case 'wed':
        startDateModifier = 4;
        break;
      case 'thu':
        startDateModifier = 3;
        break;
      case 'fri':
        startDateModifier = 2;
        break;
      case 'sat':
        startDateModifier = 1;
        break;
      case 'sun':
        startDateModifier = 0;
        break;
      default:
        break;
    }
  }

  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach((item, index) => {
    if (item.includes(dayString)) {
      number = (index + startDateModifier) % 7;
    }
  });

  return number;
}

export function getLastDaysInMonth(date: dayjs.Dayjs | string, size = 0) {
  return getLastElementsInArray(getDaysInMonth(date), size);
}

export function getFirstDaysInMonth(date: string | dayjs.Dayjs, size = 0) {
  return getFirstElementsInArray(getDaysInMonth(date), size);
}

export function dateIsValid(date: Date | number) {
  return date instanceof Date && !isNaN(date.getTime());
}

// eslint-disable-next-line react/display-name,@typescript-eslint/ban-types
export const Arrow = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute z-20 h-4 w-4 rotate-45 mt-0.5 ml-[1.2rem] border-l border-t border-gray-300 bg-white dark:bg-slate-800 dark:border-slate-600"
    />
  );
});

export const RoundedButton = ({
  children,
  onClick,
  disabled,
  roundedFull = false,
  padding = 'py-[0.55rem]',
  active = false,
}: Button) => {
  const getClassName = useCallback(() => {
    const darkClass = 'dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10';
    const activeClass = active ? 'font-semibold bg-gray-50 dark:bg-white/5' : '';
    const defaultClass = !roundedFull
      ? `w-full tracking-wide ${darkClass} ${activeClass} transition-all duration-300 px-3 ${padding} uppercase hover:bg-gray-100 rounded-md focus:ring-1`
      : `${darkClass} ${activeClass} transition-all duration-300 hover:bg-gray-100 rounded-full p-[0.45rem] focus:ring-1`;
    const disabledClass = disabled ? 'line-through' : '';

    return `${defaultClass} 'bg-celestial_blue-500' ${disabledClass}`;
  }, [disabled, padding, roundedFull, active]);

  return (
    <button
      type="button"
      className={getClassName()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default function useOnClickOutside(
  ref: React.RefObject<HTMLDivElement>,
  handler: (e?: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
