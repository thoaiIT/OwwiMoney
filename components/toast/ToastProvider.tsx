'use client';
import React, { useState } from 'react';
import * as Toast from '@radix-ui/react-toast';
import clsx from 'clsx';

type Props = { children: React.ReactNode };
export type ToastProps = { id?: string; title?: string; message: string; error?: boolean; show?: boolean };

export const ToastContext = React.createContext({
  toasts: [
    {
      message: '',
    },
  ],
  success: ({ title, message }: ToastProps) => {},
  error: ({ title, message }: ToastProps) => {},
});

export default function ToastProvider({ children }: Props) {
  const [toasts, setToast] = useState<ToastProps[]>([]);
  const duration = 3000;
  const successHandler = ({ title, message }: ToastProps) => {
    const toastId = new Date().getTime().toString();
    setToast((prev) => {
      const update: ToastProps[] = [...prev];
      const toast = {
        id: toastId,
        title: title ? title : '',
        message: message,
        error: false,
        show: true,
      };
      update.push(toast);
      return update;
    });
  };

  const errorHandler = ({ title, message }: ToastProps) => {
    setToast((prev) => {
      const update: ToastProps[] = [...prev];
      update.push({
        id: new Date().getTime().toString(),
        title: title ? title : '',
        message: message,
        error: true,
        show: true,
      });
      return update;
    });
  };

  const showToastHandler = (toastId: string) => {
    setToast((prev) => {
      const update: ToastProps[] = [...prev];
      const toast = update.filter((item) => item.id === toastId)[0];
      if (toast) toast.show = false;
      return update.filter((item) => item.id !== toastId);
    });
  };

  return (
    <ToastContext.Provider value={{ toasts, success: successHandler, error: errorHandler }}>
      <Toast.Provider swipeDirection="right">
        {toasts.map((toast) => {
          return (
            <Toast.Root
              key={toast.id}
              duration={2000}
              open={toast.show}
              onOpenChange={() => {
                showToastHandler(String(toast.id));
              }}
              className={clsx(
                toast.error ? 'bg-color-error' : 'bg-color-success',
                'text-light-mode font-bold',
                "rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut",
              )}
            >
              <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
                {toast.title}
              </Toast.Title>
              <Toast.Description>{toast.message}</Toast.Description>
              <Toast.Action
                className="[grid-area:_action]"
                asChild
                altText="Goto schedule to undo"
              >
                <button className="inline-flex items-center justify-center rounded-full font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8">
                  X
                </button>
              </Toast.Action>
            </Toast.Root>
          );
        })}

        <div>{children}</div>
        <Toast.Viewport className="[--viewport-padding:_25px] fixed top-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}
