import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddStockComponent } from './product-add-stock.component';

describe('ProductAddStockComponent', () => {
  let component: ProductAddStockComponent;
  let fixture: ComponentFixture<ProductAddStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
