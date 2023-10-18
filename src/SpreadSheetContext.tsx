import React, {
  createContext,
  useContext,
  type ReactNode,
  useState,
  type ReactElement,
  useCallback,
  useEffect,
} from 'react';
import type { Sheet } from './types';
import { defaultSheetCells } from './defaultSheetData';

export type SpreadSheetType = {
  sheets: Sheet[];
  sheet?: Sheet;
  addSheet: (sheet: Sheet) => void;
  addDefaultSheet: () => void;
  replaceSheets: (sheet: Sheet[]) => void;
  removeSheet: (sheetId: string | number) => void;
  setActiveSheet: (sheet: Sheet) => void;
};

export const SpreadSheetContext = createContext<SpreadSheetType | undefined>(
  undefined
);

export function useSpreadSheetContext() {
  const context = useContext(SpreadSheetContext);
  if (context === undefined) {
    throw new Error('useSheetContext must be used within a SheetProvider');
  }
  return context;
}

type SpreadSheetProviderProps = {
  children: ReactNode;
};

export function SpreadSheetProvider({
  children,
}: SpreadSheetProviderProps): ReactElement {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [sheet, setSheet] = useState<Sheet>();

  const addSheet = (_sheet: Sheet) => {
    setSheets((prevSheets) => [...prevSheets, _sheet]);
  };

  const addDefaultSheet = useCallback(() => {
    const defaultSheet: Sheet = {
      id: 'Sheet1',
      name: 'Sheet 1',
      data: defaultSheetCells,
    };
    setSheets([defaultSheet]);
    setSheet(defaultSheet);
  }, []);

  useEffect(() => {
    addDefaultSheet();
  }, [addDefaultSheet]);

  const replaceSheets = (_sheets: Sheet[]) => {
    if (!_sheets.length) {
      addDefaultSheet();
    } else {
      setSheets([..._sheets]);
    }
  };

  const removeSheet = (sheetId: string | number) => {
    setSheets((prevSheets) =>
      prevSheets.filter((_sheet) => _sheet.id !== sheetId)
    );
  };

  const setActiveSheet = (_sheet: Sheet) => {
    setSheet(_sheet);
  };

  return (
    <SpreadSheetContext.Provider
      value={{
        sheets,
        addSheet,
        removeSheet,
        sheet,
        setActiveSheet,
        replaceSheets,
        addDefaultSheet,
      }}
    >
      {children}
    </SpreadSheetContext.Provider>
  );
}
