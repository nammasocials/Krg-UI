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
  @Input() headerData: customTableHeader[] = [];
  @Input() title: string = "Records";
  noOfRecordsToDisplay: number = 10;
  noOfRecords: number = 0;

  dataToDisplay: any[] = [];
  searchTerm: string = '';

  constructor() {
    this.noOfRecordsToDisplay = this.assignValueBasedOnLength(this.noOfRecords);
    console.log(this.noOfRecordsToDisplay);
    this.renderTable();
  }
  renderTable() {
    this.noOfRecords = this.data.length;
    this.dataToDisplay = this.data.slice(0, this.noOfRecordsToDisplay);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.noOfRecords = this.data.length;
      this.noOfRecordsToDisplay = this.assignValueBasedOnLength(this.noOfRecords);
      console.log(this.noOfRecordsToDisplay);
      this.renderTable();
    }
  }


  filterTable() {
    if (this.searchTerm.length > 0) {
      const lowerKeyword = this.searchTerm.toLowerCase();
      this.dataToDisplay = this.data.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(lowerKeyword)
        )
      );
    }
    else {
      this.dataToDisplay = this.data;
    }
  }
  changeRowsPerPage() {
    this.renderTable();
  }
  assignValueBasedOnLength(len: number): number {
    console.log("len is ", len);
    if (len <= 5) {
      return 5;
    } else if (len >= 6 && len <= 10) {
      return 10;
    } else if (len >= 11 && len < 15) {
      return 15;
    } else if (len >= 15 && len <= 20) {
      return 20;
    } else if (len > 20) {
      return 20;
    } else {
      return 0; // default or fallback value
    }
  }

}
