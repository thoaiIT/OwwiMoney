import { useContext } from 'react';
import { ToastContext } from './ToastProvider';

export default function useToast() {
  const { success, error, toast } = useContext(ToastContext);
  return { success, error, toast };
}
