'use client';

import React, { Fragment, type ReactNode } from 'react';
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
import { CommonButton } from '../button';
import { tailwindMerge } from '../../utils/helper';

interface DialogFormProps {
  titleDialog: ReactNode;
  children: ReactNode;
  useCustomTrigger?: ReactNode;
  useCustomNameButton?: string;
  customStyleHeader?: string;
  customStyleFooter?: string;
  useCustomFooter?: ReactNode;
  handleSubmit?: () => void;
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
}: DialogFormProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        {useCustomTrigger ? (
          <Fragment>{useCustomTrigger}</Fragment>
        ) : (
          <CommonButton>{useCustomNameButton || 'Open Dialog'}</CommonButton>
        )}
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />

        <DialogContent onPointerDownOutside={(e) => allowCloseOutside ?? e.preventDefault()}>
          <DialogHeader className={tailwindMerge(customStyleHeader)}>
            <DialogTitle>{titleDialog}</DialogTitle>
            <DialogClose onClick={() => console.log('check')} />
          </DialogHeader>

          <DialogDescription>{children}</DialogDescription>

          <DialogFooter className={tailwindMerge(customStyleFooter)}>
            {useCustomFooter ? (
              <Fragment>{useCustomFooter}</Fragment>
            ) : (
              <Fragment>
                {!isNotUseDefaultFooter && (
                  <DialogClose>
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
