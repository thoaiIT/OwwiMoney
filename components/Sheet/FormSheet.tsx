'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from '@/components/Sheet/Sheet';
import { CommonButton } from '@/components/button';
import { tailwindMerge } from '@/utils/helper';
import { Fragment, type ReactNode } from 'react';

interface FormSheetProps {
  titleSheet: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right' | null;
  children: ReactNode;
  useCustomTrigger?: ReactNode;
  useCustomNameButton?: string;
  allowCloseOutside?: boolean;
  customStyleHeader?: string;
  customStyleFooter?: string;
  useCustomFooter?: ReactNode;
  isNotUseDefaultFooter?: boolean;
  handleSubmit?: () => void;
  customTextFooterButton?: string;
}

/**
 *
 * @param titleSheet the title of the sheet
 * @param side fixed position of the sheet
 * @param children the children component inside the sheet description
 * @param useCustomTrigger the component invoke trigger event of the sheet, default 'button'
 * @param useCustomNameButton the name of button invoke trigger event of the sheet
 * @param allowCloseOutside Allows to close the sheet when clicking outside the sheet or not
 * @param customStyleHeader custom header style of the header sheet
 * @param customStyleFooter custom footer style of the footer sheet
 * @param useCustomFooter the footer component
 * @param isNotUseDefaultFooter Whether to use default footer or not, default button
 * @param handleSubmit function handle footer component event
 * @param customTextFooterButton the name of footer button
 */

const FormSheet = ({
  children,
  useCustomTrigger,
  useCustomNameButton,
  allowCloseOutside,
  customStyleHeader,
  titleSheet,
  side,
  customStyleFooter,
  useCustomFooter,
  isNotUseDefaultFooter,
  handleSubmit,
  customTextFooterButton,
}: FormSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        {useCustomTrigger ? (
          <Fragment>{useCustomTrigger}</Fragment>
        ) : (
          <CommonButton>{useCustomNameButton || 'Open Sheet'}</CommonButton>
        )}
      </SheetTrigger>

      <SheetPortal>
        <SheetOverlay />

        <SheetContent
          side={side}
          onPointerDownOutside={(e) => allowCloseOutside ?? e.preventDefault()}
        >
          <SheetHeader className={tailwindMerge(customStyleHeader)}>
            <SheetTitle>{titleSheet}</SheetTitle>
            <SheetClose onClick={() => console.log('closes')} />
          </SheetHeader>

          <SheetDescription>{children}</SheetDescription>

          <SheetFooter className={tailwindMerge(customStyleFooter)}>
            {useCustomFooter ? (
              <Fragment>{useCustomFooter}</Fragment>
            ) : (
              <Fragment>
                {!isNotUseDefaultFooter && (
                  <SheetClose>
                    <button onClick={handleSubmit}>{customTextFooterButton ?? 'Submit'}</button>
                  </SheetClose>
                )}
              </Fragment>
            )}
          </SheetFooter>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
};

export default FormSheet;
