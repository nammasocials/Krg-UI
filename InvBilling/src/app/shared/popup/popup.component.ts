import { CommonModule } from '@angular/common';
import { Component, ComponentRef, ElementRef, EventEmitter, Injector, Input, OnDestroy, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnDestroy {
  @Input() title = 'Popup';
  @Input() width = '20%';
  @Input() message = '';
  @Input() footerType: 'ok' | 'confirm' | 'none' = 'ok';
  @Input() headerBg = 'bg-blue-600';
  @Input() childComponent?: Type<any>;
  @Input() childData: any;
  @Output() closed = new EventEmitter<any>();

  @ViewChild('childContainer', { read: ViewContainerRef }) childContainer!: ViewContainerRef;

  private childRef?: ComponentRef<any>;

  @ViewChild('popupContainer') popupContainer!: ElementRef;
  @ViewChild('dragHandle') dragHandle!: ElementRef;

  childInjector!: Injector;

  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;


  get showFooter() {
    return this.footerType !== 'none';
  }

  ngAfterViewInit() {
    const handle = this.dragHandle.nativeElement;
    handle.addEventListener('mousedown', this.startDrag.bind(this));
    document.addEventListener('mouseup', this.stopDrag.bind(this));
    document.addEventListener('mousemove', this.onDrag.bind(this));
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

  startDrag(event: MouseEvent) {
    this.isDragging = true;

    const rect = this.popupContainer.nativeElement.getBoundingClientRect();
    this.offsetX = event.clientX - rect.left;
    this.offsetY = event.clientY - rect.top;

    // Prevent text selection while dragging
    event.preventDefault();
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;

    const left = event.clientX - this.offsetX;
    const top = event.clientY - this.offsetY;

    const container = this.popupContainer.nativeElement;
    container.style.position = 'absolute';
    container.style.left = `${left}px`;
    container.style.top = `${top}px`;
  }

  stopDrag() {
    this.isDragging = false;
  }
}
