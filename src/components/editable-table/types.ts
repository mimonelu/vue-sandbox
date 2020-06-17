export interface TEditableTable {
  headers?: any;
  bodies?: any;
  columnRegulations?: any;
  numberOfLines?: boolean;
  disabled?: boolean;
  focus?: any;
}

export interface TEditableTableButtonParams {
  cell: any;
  row: number;
  column: number;
}

export interface TObject {
  [key: string]: any;
}
