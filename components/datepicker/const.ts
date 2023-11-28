import type { DateValueType, DatepickerStore } from '@/components/datepicker/type';
import { createContext } from 'react';

export const DAYS = [0, 1, 2, 3, 4, 5, 6];

export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
  disabledDates: null,
  inputName: undefined,
  classNames: undefined,
  popoverDirection: undefined,
});
