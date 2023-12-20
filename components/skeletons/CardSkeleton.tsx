const CardSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 animate-pulse">
      {/* Skeleton loading for card */}
      <div className="w-full h-20 bg-gray-300 rounded-md mb-4" />
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" />
        <div>
          <div className="w-20 h-4 bg-gray-300 mb-2" />
          <div className="w-10 h-3 bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
