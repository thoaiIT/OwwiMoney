import dayjs from 'dayjs';
import React, { createContext } from 'react';

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

interface DatepickerStore {
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
  readOnly?: boolean;
  disabledDates?: DateRangeType[] | null;
  inputName?: string;
  classNames?: ClassNamesTypeProp;
  popoverDirection?: PopoverDirectionType;
}

export const DatepickerContext = createContext<DatepickerStore>({
  input: undefined,
  calendarContainer: null,
  arrowContainer: null,
  period: { start: null, end: null },
  changePeriod: (period) => {},
  hideDatepicker: () => {},
  dayHover: null,
  changeDayHover: (day: string | null) => {},
  inputText: '',
  changeInputText: (text) => {},
  updateFirstDate: (date) => {},
  changeDatepickerValue: (value: DateValueType, e: HTMLInputElement | null | undefined) => {},
  showFooter: false,
  value: null,
  disabled: false,
  readOnly: false,
  disabledDates: null,
  inputName: undefined,
  classNames: undefined,
  popoverDirection: undefined,
});

export interface Button {
  children: JSX.Element | JSX.Element[];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  roundedFull?: boolean;
  padding?: string;
  active?: boolean;
}