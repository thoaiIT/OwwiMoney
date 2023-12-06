import RootLoading from '@/components/RootLoading';

const Loading = () => {
  return (
    <div className="flex flex-col bg-light-mode dark:bg-dark-mode text-dark-mode dark:text-light-mode items-center justify-center h-screen marker:text-center">
      <RootLoading />
    </div>
  );
};

export default Loading;
