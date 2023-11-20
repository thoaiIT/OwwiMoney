import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { options } from '../../../app/api/auth/[...nextauth]/options';
const Page = async () => {
  const session = await getServerSession(options);
  if (!session?.user?.emailConfirmed) redirect('/verification');
  return <div>Transactions</div>;
};

export default Page;
