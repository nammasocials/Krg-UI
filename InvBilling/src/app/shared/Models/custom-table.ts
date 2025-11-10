export interface customTableHeader{
    headerLabel: string;
    field: string;
}
export interface options{
    label: string;
    actions: optionsEnum;
    theme : string;
}
export interface optionsData{
    type : optionsEnum;
    element : any;
}
export interface customTableOptionsEmitter{
    type : optionsEnum;
    data : any;
}
export enum optionsEnum {
  View = 'View',
  Edit = 'Edit',
  Delete = 'Delete'
}
