import { Type } from "@angular/core";

export interface PopupState {
  showPopup: boolean;
  isConfirmed? : boolean;
  submitPopup?: boolean;
  popupTitle: string;
  popupMessage?: string;
  popupFooterType: 'ok' | 'confirm' | 'none' | 'Save';
  popupChild?: Type<any>;
  popupChildData?: any;
  popupWidth?: string;
}

// export class PopupData {
//     showPopup: boolean = false;
//     popupTitle: string = "";
//     popupMessage: string = "";
//     popupFooterType: 'ok' | 'confirm' | 'none' = 'ok';
//     popupChild?: any;
//     popupChildData: any;
//     popupWidth = '35%';

//    constructor(
//     showPopup = false,
//     popupTitle = '',
//     popupMessage = '',
//     popupFooterType: 'ok' | 'confirm' | 'none' = 'ok',  // <-- typed parameter with default value
//     childComponent: any = null,
//     childData: any = null,
//     popupWidth = '35%'
//   ) {
//     this.showPopup = showPopup;
//     this.popupTitle = popupTitle;
//     this.popupMessage = popupMessage;
//     this.popupFooterType = popupFooterType;
//     this.popupChild = childComponent;
//     this.popupChildData = childData;
//     this.popupWidth = popupWidth;
//   }
// }
