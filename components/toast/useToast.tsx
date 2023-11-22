import { useContext } from 'react';
import { ToastContext } from '../../context/ToastProvider';

export default function useToast() {
  const { success, error, toasts } = useContext(ToastContext);
  return { success, error, toasts };
}
