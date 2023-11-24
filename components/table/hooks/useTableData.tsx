import { DEFAULT_PAGE_SIZE } from '@/constants';
import type { ObjectWithDynamicKeys } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

export type UseTableDataResult = {
  selectedKeys: string[];
  customAction: ActionUseTableType;
  pageSize: number;
  currentPage: number;
  totalPage: number;
  setSelectedKeys: Dispatch<SetStateAction<string[]>>;
  addCustomAction: (actionName: string, callback: () => void) => void;
  changeTotalPage: (number: number) => void;
  goNextPage: () => void;
  goPreviousPage: () => void;
};

export type ActionUseTableType = ObjectWithDynamicKeys<() => void>;

const useTableData = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [customAction, setCustomAction] = useState<ActionUseTableType>({});

  const [pageInfo, setPageInfo] = useState({
    pageSize: DEFAULT_PAGE_SIZE,
    currentPage: 1,
    totalPage: 0,
  });
  const currentQuery = queryString.parse(searchParams.toString());

  const addCustomAction = (actionName: string, callback: () => void) => {
    setCustomAction((prev) => {
      const updated = { ...prev };
      updated[actionName] = callback;
      return updated;
    });
  };

  const updateURL = (updatedQuery: any) => {
    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      { skipNull: true },
    );
    router.push(url);
  };

  const goNextPage = () => {
    const nextPage = Math.min(pageInfo.currentPage + 1, pageInfo.totalPage);
    setPageInfo((prev) => ({ ...prev, currentPage: nextPage }));

    const updatedQuery = {
      ...currentQuery,
      page: nextPage,
    };
    updateURL(updatedQuery);
  };

  const goPreviousPage = () => {
    const prevPage = Math.max(pageInfo.currentPage - 1, 1);
    setPageInfo((prev) => ({ ...prev, currentPage: prevPage }));
    const updatedQuery = {
      ...currentQuery,
      page: prevPage,
    };
    updateURL(updatedQuery);
  };

  const changeTotalPage = (number: number) => {
    setPageInfo((prev) => ({ ...prev, totalPage: number }));
  };

  useEffect(() => {
    setPageInfo((prev) => ({
      ...prev,
      currentPage: Number(currentQuery?.page) || 1,
      pageSize: Number(currentQuery?.pageSize) || DEFAULT_PAGE_SIZE,
    }));
  }, [searchParams]);

  return {
    selectedKeys,
    customAction,
    currentPage: pageInfo.currentPage,
    pageSize: pageInfo.pageSize,
    totalPage: pageInfo.totalPage,
    setSelectedKeys,
    addCustomAction,
    changeTotalPage,
    goNextPage,
    goPreviousPage,
  };
};

export default useTableData;
