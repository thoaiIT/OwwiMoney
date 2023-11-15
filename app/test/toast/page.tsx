'use client';
import React from 'react';
import useToast from '../../../components/toast/useToast';

export default function Page() {
  const { success } = useToast();

  const handleToast = () => {
    success();
  };
  return (
    <div>
      <button onClick={handleToast}>Open toast</button>
    </div>
  );
}
