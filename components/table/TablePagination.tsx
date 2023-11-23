import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
type Props = { he?: string };

const TablePagination = ({ he }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const currentQuery = qs.parse(params.toString());
  const totalPage = 20;
  const pageSize = 10;
  const currentPage = 1;

  const previousPageHandler = () => {
    //
  };

  const nextPageHandler = () => {
    const updatedQuery: any = {
      ...currentQuery,
      page: currentPage + 1,
      pageSize: pageSize,
    };
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      { skipNull: true },
    );
    router.push(url);
  };

  return (
    <div className="px-4 md:px-14 lg:px-20 pt-4">
      <div className="flex justify-end gap-2 items-center align-middle">
        <div>
          <div className="text-sm me-4">
            <span>Page Size: </span>
            <span>{pageSize}</span>
          </div>
        </div>
        <div>
          <div className="text-sm">
            <span>{currentPage}</span>
            <span> of </span>
            <span>{totalPage}</span>
          </div>
        </div>
        <div className="flex align-middle items-center">
          <Button
            className="rounded-full hover:bg-white-400"
            onClick={previousPageHandler}
          >
            <CaretLeftIcon
              width={'23px'}
              height={'23px'}
            />
          </Button>
          <Button
            className="rounded-full hover:bg-white-400"
            onClick={nextPageHandler}
          >
            <CaretRightIcon
              width={'23px'}
              height={'23px'}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
