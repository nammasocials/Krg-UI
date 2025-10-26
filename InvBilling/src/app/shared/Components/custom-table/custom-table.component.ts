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
  noOfRecords: number = 10;

  dataToDisplay: any[] = [];
  searchTerm: string = '';

  constructor() {
    this.renderTable();
  }
  renderTable(){
    this.dataToDisplay = this.data.slice(0, this.noOfRecords);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
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
    this.dataToDisplay = this.data.slice(0, this.noOfRecords);
  }
}
