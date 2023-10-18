export type Columns = string[];
export type Rows = string[];

export interface Sheet {
  id?: string;
  name?: string;
  data?: Cell[][];
  columns?: Columns;
  rows?: Rows;
}

export interface CellStyles {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

export interface CellFontStyle {
  fontSize?: number;
  color?: string;
}

export interface Cell {
  value?: string | number | Date;
  cellStyles?: CellStyles;
  fontStyle?: CellFontStyle;
  readonly?: boolean;
}
