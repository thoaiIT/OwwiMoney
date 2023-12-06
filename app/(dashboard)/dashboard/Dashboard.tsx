'use client';

import CommonDatePicker from '@/components/datepicker';
import Link from 'next/link';
import { useState } from 'react';

const Dashboard = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const handleChange = (value: any) => {
    setValue(value);
    console.log('value', value);
  };
  return (
    <div>
      Dashboard
      <hr />
      <Link href="/api/auth/signout?callbackUrl=/login">Logout</Link>
      <CommonDatePicker
        name="datepicker"
        value={value}
        onChange={handleChange}
        asSingle
      />
      {/* <FormSheet
        titleSheet="Are you sure absolutely sure?"
        side={'right'}
        allowCloseOutside
      >
        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
      </FormSheet> */}
      {/* <p>{session?.user?.email}</p> */}
    </div>
  );
};

export default Dashboard;
