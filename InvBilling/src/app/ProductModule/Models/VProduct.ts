export class VProduct {
    productCode: string = "";
    productName: string = "";
    currentStock: number = 0;
    unitType : number = 0;
    unitName: string = "";
    shortName: string = "";
    pluralUnitName: string = "";
    pluralShortName: string = "";
    unitNameDetail: string = "";
    unitCost: number = 0;
    hsncode : string = "";
    isActive : boolean = true;
    createdOn : string = "";
    createdBy : string = "";
    modifiedOn : string = "";
    modifiedBy  : string = "";
    stockDisplay  : string = "";
}

export class VProductInput {
    productCode: string = "";
    productName : string = "";
    currentStock : number = 0;
    unitType : number = 0;
    unitCost : number = 0;
    hsncode : string = "";
}
