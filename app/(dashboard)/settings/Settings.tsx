import TabClient from '@/app/(dashboard)/transactions/TabClient';

const Settings = () => {
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
            children: 'aaaa',
          },
          { value: 'security', children: 'Revenue page' },
        ]}
      />
    </>
  );
};

export default Settings;
