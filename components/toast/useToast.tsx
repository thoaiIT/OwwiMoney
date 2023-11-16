import { useContext } from 'react';
import { ToastContext } from './ToastProvider';

export default function useToast() {
  const { success, error, toasts } = useContext(ToastContext);
  return { success, error, toasts };
}
