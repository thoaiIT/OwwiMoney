import dayjs from 'dayjs';
import React, { useCallback, useContext, useEffect, useRef } from 'react';

import DatepickerContext from '@/components/datepicker/type';
import { dateIsValid, parseFormattedDate } from '@/components/datepicker/utils';

type Props = {
  setContextRef?: (ref: React.RefObject<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = (e: Props) => {
  // Context
  const {
    period,
    dayHover,
    changeDayHover,
    calendarContainer,
    arrowContainer,
    inputText,
    changeInputText,
    changeDatepickerValue,
    asSingle,
    disabled,
    popoverDirection,
  } = useContext(DatepickerContext);

  // UseRefs
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Functions

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      const dates = [];

      if (asSingle) {
        const date = parseFormattedDate(inputValue);
        if (dateIsValid(date.toDate())) {
          dates.push(date.format('YYYY-MM-DD'));
        }
      }
      if (dates[0]) {
        changeDatepickerValue(
          {
            startDate: dates[0],
            endDate: dates[1] || dates[0],
          },
          e.target,
        );
        if (dates[1]) changeDayHover(dayjs(dates[1]).add(-1, 'day').format('YYYY-MM-DD'));
        else changeDayHover(dates[0]);
      }

      changeInputText(e.target.value);
    },
    [asSingle, changeDatepickerValue, changeDayHover, changeInputText],
  );

  // UseEffects && UseLayoutEffect
  useEffect(() => {
    if (inputRef && e.setContextRef && typeof e.setContextRef === 'function') {
      e.setContextRef(inputRef);
    }
  }, [e, inputRef]);

  useEffect(() => {
    const button = buttonRef?.current;

    function focusInput(e: Event) {
      e.stopPropagation();
      const input = inputRef.current;
      if (input) {
        input.focus();
        if (inputText) {
          changeInputText('');
          if (dayHover) {
            changeDayHover(null);
          }
          if (period.start && period.end) {
            changeDatepickerValue(
              {
                startDate: null,
                endDate: null,
              },
              input,
            );
          }
        }
      }
    }

    if (button) {
      button.addEventListener('click', focusInput);
    }

    return () => {
      if (button) {
        button.removeEventListener('click', focusInput);
      }
    };
  }, [changeDatepickerValue, changeDayHover, changeInputText, dayHover, inputText, period.end, period.start, inputRef]);

  useEffect(() => {
    const div = calendarContainer?.current;
    const input = inputRef.current;
    const arrow = arrowContainer?.current;

    function showCalendarContainer() {
      if (arrow && div && div.classList.contains('hidden')) {
        div.classList.remove('hidden');
        div.classList.add('block');
        const popoverOnUp = popoverDirection === 'up';
        const popoverOnDown = popoverDirection === 'down';
        if (
          popoverOnUp ||
          (window.innerWidth > 767 && window.screen.height - 100 < div.getBoundingClientRect().bottom && !popoverOnDown)
        ) {
          div.classList.add('bottom-full');
          div.classList.add('mb-2.5');
          div.classList.remove('mt-2.5');
          arrow.classList.add('-bottom-2');
          arrow.classList.add('border-r');
          arrow.classList.add('border-b');
          arrow.classList.remove('border-l');
          arrow.classList.remove('border-t');
        }

        setTimeout(() => {
          div.classList.remove('translate-y-4');
          div.classList.remove('opacity-0');
          div.classList.add('translate-y-0');
          div.classList.add('opacity-1');
        }, 1);
      }
    }

    if (div && input) {
      input.addEventListener('focus', showCalendarContainer);
    }

    return () => {
      if (input) {
        input.removeEventListener('focus', showCalendarContainer);
      }
    };
  }, [calendarContainer, arrowContainer, popoverDirection]);

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        disabled={disabled}
        placeholder='"YYYY-MM-DD" ~ "YYYY-MM-DD"'
        value={inputText}
        autoComplete="off"
        onChange={handleInputChange}
      />
    </>
  );
};

export default Input;
