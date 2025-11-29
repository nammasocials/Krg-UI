export class VProduct {
    productCode: string = "";
    productName: string = "";
    currentStock: number = 0;
    shortName: string = "";
    unitCost: number = 0;
    centralGstPer : number = 0;
    stateGstPer : number = 0;
    intraStateTotal : number = 0;
    interStateTotal : number = 0;
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
    centralGstPer : number = 0;
    stateGstPer : number = 0;
    hsncode : string = "";
}
