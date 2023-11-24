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
  DialogOverlay,
  DialogPortal,
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
  handleSubmit?: () => void;
  handleClose?: () => void;
  allowCloseOutside?: boolean;
  isNotUseDefaultFooter?: boolean;
  customTextFooterButton?: string;
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
  handleSubmit,
  handleClose,
}: DialogFormProps) => {
  return (
    <Dialog
      onOpenChange={(open) => {
        !open && !!handleClose && handleClose();
      }}
    >
      <DialogTrigger asChild>
        {useCustomTrigger ? useCustomTrigger : <CommonButton>{useCustomNameButton || 'Open Dialog'}</CommonButton>}
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          onPointerDownOutside={(e) => allowCloseOutside ?? e.preventDefault()}
          className="bg-theme"
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
                    <button onClick={handleSubmit}>{customTextFooterButton ?? 'Submit'}</button>
                  </DialogClose>
                )}
              </Fragment>
            )}
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DialogForm;
