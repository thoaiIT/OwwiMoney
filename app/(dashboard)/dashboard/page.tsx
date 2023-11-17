import { getServerSession } from 'next-auth';
import { options } from '../../api/auth/[...nextauth]/options';
import Dashboard from './Dashboard';

const Page = async () => {
  const session = await getServerSession(options);
  console.log('Dashboard', session?.user);
  return <Dashboard />;
};

export default Page;
