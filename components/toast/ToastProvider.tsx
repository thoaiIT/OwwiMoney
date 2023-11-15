'use client';
import React, { useState } from 'react';

type Props = { children: React.ReactNode };
export const ToastContext = React.createContext({
  toast: <div />,
  success: () => {},
  error: () => {},
});
export default function ToastProvider({ children }: Props) {
  const [toast, setToast] = useState(<div />);
  const [show, setShow] = useState(false);

  const successHandler = () => {
    if (show) return;
    setShow(true);
    setToast(<div>{Math.trunc(Math.random() * 1000)}</div>);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };
  const errorHandler = () => {
    if (show) return;
    setShow(true);
    setToast(<div>{Math.trunc(Math.random() * 1000)}</div>);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast, success: successHandler, error: errorHandler }}>
      <div>why?</div>
      {show && <div>{toast}</div>}
      <div>{children}</div>
    </ToastContext.Provider>
  );
}
