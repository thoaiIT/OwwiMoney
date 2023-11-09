import React from 'react';
import { createUser } from '../../../actions/user/create';

export default async function page() {
  await createUser();
  return <div>createUser</div>;
}
