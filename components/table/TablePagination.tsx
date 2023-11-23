import type { UseTableDataResult } from '@/components/table/hooks/useTableData';
import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
type Props = { tableData?: UseTableDataResult };

const TablePagination = ({ tableData }: Props) => {
  const { pageSize, currentPage, totalPage, goNextPage, goPreviousPage } = tableData || {};
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
            onClick={goPreviousPage}
          >
            <CaretLeftIcon
              width={'23px'}
              height={'23px'}
            />
          </Button>
          <Button
            className="rounded-full hover:bg-white-400"
            onClick={goNextPage}
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
