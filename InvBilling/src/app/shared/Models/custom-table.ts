export interface customTableHeader{
    headerLabel: string;
    field: string;
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
