import { AfterViewInit, Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { customTableHeader } from '../../Models/custom-table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatInputModule 
  ],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent implements AfterViewInit {
  @Input() data: any[] = [];
  filteredData: any[] = [];
  @Input() headerData: customTableHeader[] = [];
  @Input() title: string = "Records";

  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20];
  startRecord: number = 0;
  endRecord: number = 0;
  searchTerm: string = "";

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.refreshTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['headerData']) {
      this.refreshTable();
    }
  }

  refreshTable() {
    if (!this.data || !this.headerData) return;

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
      this.filteredData = this.data.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(lowerKeyword)
        )
      );
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
    const start = this.pageIndex * this.pageSize + 1;
    const end = Math.min(
      (this.pageIndex + 1) * this.pageSize,
      this.filteredData.length
    );
    this.startRecord = start;
    this.endRecord = end;
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
