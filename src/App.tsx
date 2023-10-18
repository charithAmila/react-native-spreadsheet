import React, { useEffect } from 'react';
import type { Sheet } from './types';
import { useSpreadSheetContext } from './SpreadSheetContext';
import { SpreadSheetBase } from './components/SpreadSheetBase';

export interface SpreadSheetProps {
  sheets: Sheet[];
}

export function App({ sheets }: SpreadSheetProps) {
  const { replaceSheets } = useSpreadSheetContext();

  useEffect(() => {
    replaceSheets(sheets);
  }, [sheets, replaceSheets]);

  return <SpreadSheetBase />;
}
