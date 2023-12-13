'use client';

import { CommonButton } from '@/components/button';
import { Fragment, type ReactNode } from 'react';
import { tailwindMerge } from '../../utils/helper';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

interface DialogFormProps {
  titleDialog: ReactNode;
  children: ReactNode;
  useCustomTrigger?: ReactNode;
  useCustomNameButton?: string;
  customStyleHeader?: string;
  customStyleFooter?: string;
  useCustomFooter?: ReactNode;
  open?: boolean;
  handleSubmit?: () => void;
  handleClose?: () => void;
  handleOpenChange?: () => void;
  allowCloseOutside?: boolean;
  isNotUseDefaultFooter?: boolean;
  customTextFooterButton?: string;
  className?: string;
}

const DialogForm = ({
  useCustomTrigger,
  useCustomNameButton,
  children,
  titleDialog,
  customStyleHeader,
  useCustomFooter,
  customStyleFooter,
  allowCloseOutside,
  customTextFooterButton,
  isNotUseDefaultFooter = false,
  open,
  handleSubmit,
  handleClose,
  handleOpenChange,
  className,
}: DialogFormProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        handleOpenChange?.();
        !open && !!handleClose && handleClose();
      }}
    >
      <DialogTrigger asChild>
        {useCustomTrigger ? useCustomTrigger : <CommonButton>{useCustomNameButton || 'Open Dialog'}</CommonButton>}
      </DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => allowCloseOutside ?? e.preventDefault()}
        className={tailwindMerge('bg-theme max-w-max', className)}
      >
        <DialogHeader className={tailwindMerge(customStyleHeader)}>
          <DialogTitle className="text-xl font-bold">{titleDialog}</DialogTitle>
          <DialogClose onClick={() => console.log('check')} />
        </DialogHeader>

        <DialogDescription>{children}</DialogDescription>

        <DialogFooter className={tailwindMerge(customStyleFooter)}>
          {useCustomFooter ? (
            <Fragment>{useCustomFooter}</Fragment>
          ) : (
            <Fragment>
              {!isNotUseDefaultFooter && (
                <DialogClose asChild>
                  <div className="flex gap-2">
                    <CommonButton
                      intent={'outline'}
                      className="max-w-max rounded-md"
                    >
                      {customTextFooterButton ?? 'Cancel'}
                    </CommonButton>
                    <CommonButton
                      className="max-w-max rounded-md bg-theme-component hover:bg-theme-component hover:opacity-90 hover:ring-0"
                      onClick={handleSubmit}
                    >
                      {customTextFooterButton ?? 'Submit'}
                    </CommonButton>
                  </div>
                </DialogClose>
              )}
            </Fragment>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
