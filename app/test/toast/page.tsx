'use client';
import React from 'react';
import useToast from '../../../components/toast/useToast';
import { Button } from '@radix-ui/themes';

export default function Page() {
  const { success, error } = useToast();

  const addToastSuccessHandler = () => {
    success({ message: 'Toast message ---- :' + (Math.trunc(Math.random() * 900000000) + 100000000).toString() });
  };
  const addToastErrorHandler = () => {
    error({ message: 'Toast message ---- :' + (Math.trunc(Math.random() * 900000000) + 100000000).toString() });
  };
  return (
    <div>
      <Button
        onClick={addToastSuccessHandler}
        className="bg-color-success"
      >
        Raise Success
      </Button>
      <br />
      <Button
        onClick={addToastErrorHandler}
        className="bg-color-success"
      >
        Raise Error
      </Button>
    </div>
  );
}
