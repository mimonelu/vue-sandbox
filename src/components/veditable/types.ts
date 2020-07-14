export interface TVeditable {
  headers?: any;
  bodies?: any;
  columnRegulations?: any;
  numberOfLines?: boolean;
  disabled?: boolean;
  headerColumn?: number;
  floatingThead?: boolean;
  floatingTbody?: boolean;
  floatingColumns?: number;
  focusable?: boolean;
  focus?: any;
  focused?: boolean;
}

export interface TVeditableButtonParams {
  cell: any;
  row: number;
  column: number;
}

export interface TObject {
  [key: string]: any;
}
