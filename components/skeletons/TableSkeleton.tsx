const TableSkeleton = () => {
  return (
    <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          {/* Table header skeleton */}
          <th className="px-6 py-3 w-1/4 animate-pulse" />
          <th className="px-6 py-3 w-1/4 animate-pulse" />
          <th className="px-6 py-3 w-1/4 animate-pulse" />
          <th className="px-6 py-3 w-1/4 animate-pulse" />
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {/* Table body skeleton */}
        {[...Array(5)].map((_, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap animate-pulse" />
            <td className="px-6 py-4 whitespace-nowrap animate-pulse" />
            <td className="px-6 py-4 whitespace-nowrap animate-pulse" />
            <td className="px-6 py-4 whitespace-nowrap animate-pulse" />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
