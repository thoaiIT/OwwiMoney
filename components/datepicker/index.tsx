'use client';

import dateFormat from 'dateformat';
import { forwardRef, useEffect, useState, type ForwardedRef, type MouseEvent } from 'react';
import DatePicker from 'react-datepicker';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

import 'react-datepicker/dist/react-datepicker.css';
interface ButtonInputProps {
  value?: Date;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const CommonDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const initialEndDate = new Date();
  initialEndDate.setMonth(startDate.getMonth() + 1);
  const [endDate, setEndDate] = useState(initialEndDate);

  useEffect(() => {
    if (startDate > endDate) setStartDate(endDate);
  }, [endDate]);

  useEffect(() => {
    if (startDate > endDate) setEndDate(startDate);
  }, [startDate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex items-center justify-center max-w-2xl py-20 mx-auto space-x-4">
        <span className="font-medium text-gray-900">DatePicker:</span>
        <div className="relative w-44">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date ?? new Date())}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            nextMonthButtonLabel=">"
            previousMonthButtonLabel="<"
            popperClassName="react-datepicker-left"
            customInput={<ButtonInput />}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex items-center justify-between px-2 py-2 w-[270px]">
                <span className="text-lg text-gray-700">{dateFormat(date, 'mmmm dS, yyyy')}</span>

                <div className="space-x-2">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    type="button"
                    className={`${
                      prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'
                    } inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500`}
                  >
                    <FaArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    type="button"
                    className={`${
                      nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'
                    }inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500`}
                  >
                    <FaArrowRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            )}
          />
        </div>
        <div className="relative w-44">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date ?? new Date())}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            nextMonthButtonLabel=">"
            previousMonthButtonLabel="<"
            popperClassName="react-datepicker-right"
            customInput={<ButtonInput />}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex items-center justify-between px-2 py-2 w-[270px]">
                <span className="text-lg text-gray-700">{dateFormat(date, 'mmmm dS, yyyy')}</span>

                <div className="space-x-2">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    type="button"
                    className={`
            ${prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
          `}
                  >
                    <FaArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    type="button"
                    className={`
            ${nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
          `}
                  >
                    <FaArrowRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

const ButtonInput = forwardRef(({ value, onClick }: ButtonInputProps, ref: ForwardedRef<HTMLButtonElement>) => (
  <button
    onClick={onClick}
    ref={ref}
    type="button"
    className="inline-flex justify-start w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
  >
    {dateFormat(value, 'mmmm dS, yyyy')}
  </button>
));

export default CommonDatePicker;
