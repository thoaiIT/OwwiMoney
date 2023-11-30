import dayjs from 'dayjs';
import React, { type RefObject } from 'react';

export interface Period {
  start: string | null;
  end: string | null;
}

export type DateType = string | null | Date;

export type DateRangeType = {
  startDate: DateType;
  endDate: DateType;
};

export type DateValueType = DateRangeType | null;

export type ClassNamesTypeProp = {
  container?: (p?: object | null | undefined) => string | undefined;
  input?: (p?: object | null | undefined) => string | undefined;
  toggleButton?: (p?: object | null | undefined) => string | undefined;
  footer?: (p?: object | null | undefined) => string | undefined;
};

export type PopoverDirectionType = 'up' | 'down';

export interface DatepickerType {
  value: DateValueType;
  onChange: (value: DateValueType, e?: HTMLInputElement | null | undefined) => void;
  useRange?: boolean;
  asSingle?: boolean;
  disabled?: boolean;
  classNames?: ClassNamesTypeProp | undefined;
  inputId?: string;
  readOnly?: boolean;
  disabledDates?: DateRangeType[] | null;
}

export interface DatepickerStore {
  input?: React.RefObject<HTMLInputElement>;
  asSingle?: boolean;
  calendarContainer: React.RefObject<HTMLDivElement> | null;
  arrowContainer: React.RefObject<HTMLDivElement> | null;
  hideDatepicker: () => void;
  period: Period;
  changePeriod: (period: Period) => void;
  dayHover: string | null;
  changeDayHover: (day: string | null) => void;
  inputText: string;
  changeInputText: (text: string) => void;
  updateFirstDate: (date: dayjs.Dayjs) => void;
  changeDatepickerValue: (value: DateValueType, e?: HTMLInputElement | null | undefined) => void;
  showFooter?: boolean;
  placeholder?: string | null;
  value: DateValueType;
  disabled?: boolean;
  disabledDates?: DateRangeType[] | null;
  inputName?: string;
  classNames?: ClassNamesTypeProp;
  popoverDirection?: PopoverDirectionType;
}

export interface Button {
  children: JSX.Element | JSX.Element[];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  roundedFull?: boolean;
  padding?: string;
  active?: boolean;
}

export interface DayProps {
  calendarData: {
    date: dayjs.Dayjs;
    days: {
      previous: number[];
      current: number[];
      next: number[];
    };
  };
  onClickPreviousDays: (day: number) => void;
  onClickDay: (day: number) => void;
  onClickNextDays: (day: number) => void;
}

export interface CalendarProps {
  date: dayjs.Dayjs;
  onClickPrevious: () => void;
  onClickNext: () => void;
  changeMonth: (month: number) => void;
  changeYear: (year: number) => void;
}

export interface MonthProps {
  currentMonth: number;
  clickMonth: (month: number) => void;
}

export interface YearProps {
  year: number;
  currentYear: number;
  clickYear: (data: number) => void;
}

export type InputProps = {
  setContextRef?: (ref: RefObject<HTMLInputElement>) => void;
};
