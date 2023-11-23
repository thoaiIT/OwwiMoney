import type { ObjectWithDynamicKeys } from '@/types';
import { useState, type Dispatch, type SetStateAction } from 'react';

export type UseTableDataResult = {
  selectedKeys: string[];
  customAction: ActionUseTableType;
  setSelectedKeys: Dispatch<SetStateAction<string[]>>;
  addCustomAction: (actionName: string, callback: () => void) => void;
};

export type ActionUseTableType = ObjectWithDynamicKeys<() => void>;

const useTableData = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [customAction, setCustomAction] = useState<ActionUseTableType>({});

  const addCustomAction = (actionName: string, callback: () => void) => {
    setCustomAction((prev) => {
      const updated = { ...prev };
      updated[actionName] = callback;
      return updated;
    });
  };

  return {
    selectedKeys,
    customAction,
    setSelectedKeys,
    addCustomAction,
  };
};

export default useTableData;
