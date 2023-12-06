'use client';

import { CommonButton } from '@/components/button';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Fragment, type ReactNode } from 'react';
import { tailwindMerge } from '../../utils/helper';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';

interface ConfirmDialogProps {
  titleDialog: ReactNode;
  useCustomTrigger?: ReactNode;
  children: ReactNode;
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

const ConfirmDialog = ({
  useCustomTrigger,
  useCustomNameButton,
  titleDialog,
  customStyleHeader,
  children,
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
}: ConfirmDialogProps) => {
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
                      {'Cancel'}
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

export default ConfirmDialog;
