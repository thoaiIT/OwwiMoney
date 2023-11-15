import { getCurrentUser } from '../../actions/user/getCurrentUser';
import Dashboard from './Dashboard';

const Page = async () => {
  const currentUser = await getCurrentUser();
  console.log('???');
  return <Dashboard currentUser={currentUser} />;
};

export default Page;
