import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductUtilityService {

  constructor() {

  }
  calculateNetCost(unitCost: number, cgst: number, sgst: number): number {
    const cgstAmt = (unitCost * cgst) / 100;
    const sgstAmt = (unitCost * sgst) / 100;

    return +(unitCost + cgstAmt + sgstAmt).toFixed(2); // round to 2 decimals
  }

}
