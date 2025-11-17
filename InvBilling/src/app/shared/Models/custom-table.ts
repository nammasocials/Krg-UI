export interface customTableHeader{
    headerLabel: string;
    field: string;
    fieldPipe?: string;
}
export class CustomTableOptions{
    isSearch : boolean = true;
    isPagination : boolean = true;
    isItemsPerPage : boolean = true;
}
export class RowColorOptions{
    isDisabled : boolean = true;
    colName : string = "";
    colorDetails : { colVal : string, color : string}[] = []; 
}
export interface RowOptions{
    label: string;
    actions: RowOptionsEnum;
    theme : string;
}
export interface RowOptionsData{
    type : RowOptionsEnum;
    element : any;
}
export interface customTableOptionsEmitter{
    type : RowOptionsEnum;
    data : any;
}
export enum RowOptionsEnum {
  View = 'View',
  AddChild = 'AddChild',
  Edit = 'Edit',
  Delete = 'Delete'
}
