export class invoiceInput {
    invoiceCode: string = "";
    invoiceNo: string = "";
    customerCode: string = "";
    isEwayBillAvailable : boolean = false;
    items : invoiceItems[] = [];
}
export class invoiceItems {
    productCode: string = "";
    unitCost: number = 0;
    quantity: number = 0;
    cost: number = 0;
    hsncode : string = "";
}