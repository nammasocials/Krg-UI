export class Vinvoice {
    invoiceCode: string = "";
    invoiceNo: string = "";
    customerName: string = "";
    customerCode : string = "";
    totalCost: number = 0;
    gst: string = "";
    isEwayBillAvailable: boolean = false;
    createdOn: string = "";
    createdBy: string = "";
    modifiedOn: string = "";
    modifiedBy: string = "";
}

export class VinvoiceDetail {
  invoiceCode: string = "";
  itemCode: string = "";
  invoiceNo: string = "";
  customerName: string = "";
  customerCode : string = "";
  customerEmail : string = "";
  gstnumber : string = "";
  productCode: string = "";
  productName: string = "";
  productLogo: string | null = null;
  productLogoMime: string | null = null;
  unitCost: number = 0;
  quantity: number = 0;
  cost: number = 0;
  centralGst: number = 0;
  centralGstAmount: number = 0;
  stateGst: number = 0;
  stateGstAmount: number = 0;
  hsncode: string = "";
  totalCost: number = 0;
  gst: string = "";
  createdOn: string | null = null;
  createdBy: string | null = null;
  modifiedOn: string | null = null;
  modifiedBy: string | null = null;
}