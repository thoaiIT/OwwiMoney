import Link from 'next/link';

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <hr />
      <Link href="/api/auth/signout?callbackUrl=/login">Logout</Link>
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
