export interface customTableHeader{
    headerLabel: string;
    field: string;
}
export class CustomTableOptions{
    isSearch : boolean = true;
    isPagination : boolean = true;
    isItemsPerPage : boolean = true;
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
  Edit = 'Edit',
  Delete = 'Delete'
}
