import { CommonModule } from '@angular/common';
import { Component, ComponentRef, EventEmitter, Injector, Input, OnDestroy, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnDestroy {
  @Input() title = 'Popup';
  @Input() message = '';
  @Input() footerType: 'ok' | 'confirm' | 'none' = 'ok';
  @Input() headerBg = 'bg-blue-600';
  @Input() childComponent?: Type<any>;
  @Input() childData: any;
  @Output() closed = new EventEmitter<any>();

  @ViewChild('childContainer', { read: ViewContainerRef }) childContainer!: ViewContainerRef;

  private childRef?: ComponentRef<any>;

  get showFooter() {
    return this.footerType !== 'none';
  }

  ngAfterViewInit() {
    if (this.childComponent) {
      this.childContainer.clear();
      this.childRef = this.childContainer.createComponent(this.childComponent);
      if (this.childData) {
        Object.assign(this.childRef.instance, this.childData);
      }
    }
  }

  onOk() {
    this.closed.emit('ok');
  }

  onConfirm() {
    this.closed.emit(true);
  }

  onCancel() {
    this.closed.emit(false);
  }

  ngOnDestroy() {
    if (this.childRef) this.childRef.destroy();
  }
}
