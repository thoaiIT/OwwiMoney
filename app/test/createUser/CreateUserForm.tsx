'use client';
import React from 'react';
import { registerUser } from '../../../actions/user/registerUser';

export default function CreateUserForm() {
  const submitHandler = async () => {
    const result = await registerUser({
      email: 'nghiant089@gmail.com',
      password: '123456',
      name: 'JAV Thanh Nghia',
    });
    console.log({ result });
  };

  return (
    <form action={submitHandler}>
      <button type="submit">Register Account</button>
    </form>
  );
}
