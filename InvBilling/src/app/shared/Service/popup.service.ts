import { Injectable, signal, Type } from '@angular/core';
import { PopupState } from '../Models/PopupModel';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() {

  }
  popupState = signal<PopupState>({
    showPopup: false,
    popupTitle: '',
    popupFooterType: 'ok',
    popupWidth: '35%',
  });

  openConfirmPopup() {
    this.popupState.set({
      showPopup: true,
      popupTitle: 'Confirmation',
      popupMessage: 'Are you sure you want to proceed?',
      popupFooterType: 'confirm',
      popupWidth: '35%',
    });
  }

  openComponentPopup(childComponent: Type<any>, childData?: any, popupTitle = 'Info', popupFooterType: 'ok' | 'confirm' | 'none' = 'ok', popupWidth = '35%') {
    this.popupState.set({
      showPopup: true,
      popupTitle,
      popupFooterType,
      popupChild: childComponent,
      popupChildData: childData,
      popupWidth,
    });
  }

  closePopup() {
    this.popupState.update(state => ({ ...state, showPopup: false }));
  }

}
