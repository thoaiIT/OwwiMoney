const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

const TransactionDialogSkeletons = () => {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-xl bg-theme p-2 shadow-sm h-full`}>
      <div className="flex p-4 h-1/6 items-center">
        <div className="h-5 w-1/4 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-3/4 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex p-4 h-1/6 items-center">
        <div className="h-5 w-1/4 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-3/4 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex p-4 h-1/6 items-center">
        <div className="h-5 w-1/4 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-3/4 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex p-4 h-1/6 items-center">
        <div className="h-5 w-1/4 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-3/4 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex p-4 h-1/6 items-center">
        <div className="h-5 w-1/4 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-3/4 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex p-4 h-1/6 items-center">
        <div className="h-5 w-1/4 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-3/4 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex p-4 h-1/6 items-center">
        <div className="h-5 w-1/4 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-3/4 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
    </div>
  );
};

export default TransactionDialogSkeletons;
