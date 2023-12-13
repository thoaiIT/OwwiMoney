import { getUserById } from '@/actions/controller/userController';
import AccountForm from '@/app/(dashboard)/settings/AccountForm';
import SecurityForm from '@/app/(dashboard)/settings/SecurityForm';
import TabClient from '@/app/(dashboard)/settings/TabClient';

const Settings = async () => {
  const result = await getUserById();
  console.log(result);
  const userProfile = {
    name: result.data?.user?.name,
    email: result.data?.user?.email,
    phone: result.data?.user?.phone,
    bio: result.data?.user?.bio,
    image: result.data?.user?.image,
  };

  return (
    <>
      <TabClient
        defaultValue="account"
        tabNames={[
          { value: 'account', label: 'Account' },
          { value: 'security', label: 'Security' },
        ]}
        tabContents={[
          {
            value: 'account',
            children: <AccountForm accountData={userProfile} />,
          },
          { value: 'security', children: <SecurityForm /> },
        ]}
      />
    </>
  );
};

export default Settings;
