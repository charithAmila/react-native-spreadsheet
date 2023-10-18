import React from 'react';
import { SpreadSheetProvider } from './SpreadSheetContext';
import { App, type SpreadSheetProps } from './App';

export interface ISpreadSheet extends SpreadSheetProps {}

export function SpreadSheet(props: ISpreadSheet) {
  return (
    <SpreadSheetProvider>
      <App {...props} />
    </SpreadSheetProvider>
  );
}
