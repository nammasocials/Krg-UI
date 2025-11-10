import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { customTableHeader, customTableOptionsEmitter, options, optionsData, optionsEnum } from '../../Models/custom-table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    InfiniteScrollDirective
  ],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent implements AfterViewInit {
  @Input() data: any[] = [];
  filteredData: any[] = [];
  mobileData: any[] = [];
  @Input() headerData: customTableHeader[] = [];
  @Input() options: options[] = [];
  @Input() title: string = "Records";

  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20];
  startRecord: number = 0;
  endRecord: number = 0;
  searchTerm: string = "";

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];

  isMobileView: boolean = false;
  mobileCurrentIndex = 0;
  mobilePageSize = 3;
  isMobileOptionsOpen = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  @Output() OptionsClicked = new EventEmitter<customTableOptionsEmitter>();

  constructor(private breakpointObserver: BreakpointObserver, private zone: NgZone) {
    this.breakpointObserver.observe([
      '(max-width: 480px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobileView = true;
      }
      else {
        this.isMobileView = false;
      }
      this.refreshTable();
    });
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    if (this.isMobileView) {
      setTimeout(() => this.loadMore());
    }
    this.refreshTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['headerData']) {
      this.refreshTable();
    }
  }

  refreshTable() {
    if (!this.data || !this.headerData) return;
    this.displayedColumns = [];

    this.displayedColumns = this.headerData.map(h => h.field);
    this.updatePagedData();
  }

  updatePagedData() {
    this.filterTable();
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.filteredData.slice(startIndex, endIndex);
    this.getRangeLabel();
  }


  filterTable() {
    if (this.searchTerm.length > 0) {
      const lowerKeyword = this.searchTerm.toLowerCase();

      const searchFields = this.headerData.map(h => h.field);

      this.filteredData = this.data.filter(item =>
        searchFields.some(field =>
          String(item[field] ?? '')
            .toLowerCase()
            .includes(lowerKeyword)
        )
      );


      // this.filteredData = this.data.filter(item =>
      //   Object.values(item).some(value =>
      //     String(value).toLowerCase().includes(lowerKeyword)
      //   )
      // );
    }
    else {
      this.filteredData = this.data;
    }
  }

  onPageSizeChange(event: Event) {
    const newSize = +(event.target as HTMLSelectElement).value;
    this.pageSize = newSize;
    this.pageIndex = 0; // reset to first page
    this.updatePagedData();
  }


  nextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.filteredData.length) {
      this.pageIndex++;
      this.updatePagedData();
    }
  }


  prevPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updatePagedData();
    }
  }


  getRangeLabel() {
    console.log(this.filteredData.length);
    const start = this.pageIndex * this.pageSize + 1;
    const end = Math.min(
      (this.pageIndex + 1) * this.pageSize,
      this.filteredData.length
    );
    this.startRecord = start;
    this.endRecord = end;
  }



  ////////////////////////////// For Mobile Devices ////////////////////////////////////////////
  loadMore() {
    if (this.filteredData.length > 0) {
      const nextItems = this.filteredData.slice(this.mobileCurrentIndex, this.mobileCurrentIndex + this.mobilePageSize);
      this.mobileData = [...this.mobileData, ...nextItems];
      this.mobileCurrentIndex += this.mobilePageSize;
    }
  }

  onScrollDown() {
    if (this.mobileData.length <= this.filteredData.length) {
      this.zone.run(() => this.loadMore());
    }
  }
  toggleMobileOptions(): void {
    this.isMobileOptionsOpen = !this.isMobileOptionsOpen;
  }


  ////////////////////////////// Data Functions ////////////////////////////////////////////
  emitSelectedActions(data: optionsData) {
    var emittedData: customTableOptionsEmitter = {
      type: data.type,
      data: data.element,
    }
    this.OptionsClicked.emit(emittedData);
  }
  // ViewData(data: any) {
  //   var emittedData: customTableOptionsEmitter = {
  //     type: optionsEnum.View,
  //     data: data,
  //   }
  //   this.OptionsClicked.emit(emittedData);
  // }
  // EditData(data: any) {
  //   var emittedData: customTableOptionsEmitter = {
  //     type: optionsEnum.Edit,
  //     data: data,
  //   }
  //   this.OptionsClicked.emit(emittedData);
  // }
  // DeleteData(data: any) {
  //   var emittedData: customTableOptionsEmitter = {
  //     type: optionsEnum.Delete,
  //     data: data,
  //   }
  //   this.OptionsClicked.emit(emittedData);
  // }
}
