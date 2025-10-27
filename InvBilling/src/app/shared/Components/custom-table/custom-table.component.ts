import { Component, Input, SimpleChanges } from '@angular/core';
import { customTableHeader } from '../../Models/custom-table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent {

  @Input() data: any[] = [];
  tempData: any[] = [];
  pageWiseData: any[] = [];
  @Input() headerData: customTableHeader[] = [];
  @Input() title: string = "Records";

  defaultItemsPerPageArray: number[] = [5, 10, 15, 20, 30];
  itemsPerPageArray: number[] = [5, 10, 15, 20, 30];
  itemsPerPage: number = 5;
  defaultItemsPerPage: number = 5;
  defaultCurrentPage: number = 1;
  currentPage: number = 1;

  dataToDisplay: any[][] = [];
  searchTerm: string = '';

  constructor() {
    this.itemsPerPage = this.itemsPerPageArray[0];
    this.renderTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.renderTable();
    }
  }


  renderTable() {
    ///// Step 01 Filter with serach term
    this.tempData = this.data;
    this.dataToDisplay = [];
    this.filterTable();
    this.calculateItemsPerPage();
    this.calculatePagination();
  }


  filterTable() {
    if (this.searchTerm.length > 0) {
      const lowerKeyword = this.searchTerm.toLowerCase();
      this.tempData = this.data.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(lowerKeyword)
        )
      );
    }
    else {
      this.tempData = this.data;
    }
  }
  calculateItemsPerPage() {
    const length = this.tempData.length;
    let defaultItemsPerPageArray = this.defaultItemsPerPageArray.filter(x => x >= length);
    const nextMaxValArray = defaultItemsPerPageArray.filter(x => x >= length);

    let nextMaxVal: number;

    // If no number in array is greater or equal, assign max value from array
    if (nextMaxValArray.length === 0) {
      nextMaxVal = Math.max(...defaultItemsPerPageArray);
    } else {
      nextMaxVal = Math.min(...nextMaxValArray);
    }
    defaultItemsPerPageArray = this.defaultItemsPerPageArray;
    const index = defaultItemsPerPageArray.indexOf(nextMaxVal);
    this.itemsPerPageArray = defaultItemsPerPageArray.slice(0, index + 1);
    
  }
  calculatePagination() {
    const tempData = this.tempData; // array with records
    const selectedPageSize = this.itemsPerPage;    // for example, selected pagination size (must be from defaultItemsPerPageArray)

    this.dataToDisplay = [];

    const totalRecords = tempData.length;
    const totalPages = Math.ceil(totalRecords / selectedPageSize);
    let startIndex = 0;
    for (let page = 1; page <= totalPages; page++) {
      let endIndex = Number(selectedPageSize) - Number(startIndex);
      if(Number(startIndex) + Number(selectedPageSize) <  totalRecords){
        endIndex = Number(startIndex) + Number(selectedPageSize);
      }
      this.dataToDisplay[page] = tempData.slice(startIndex, endIndex);
      startIndex = startIndex + selectedPageSize;
    }
    console.log(this.dataToDisplay);
  }


  changeRowsPerPage() {
    this.renderTable();
  }
  changePage(isPrev : boolean){
    if(isPrev){
      this.currentPage = this.currentPage - 1;
    }
    else{
      this.currentPage = this.currentPage + 1;
    }
  }

}
