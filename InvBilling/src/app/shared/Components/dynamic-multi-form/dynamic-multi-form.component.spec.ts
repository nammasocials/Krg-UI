import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMultiFormComponent } from './dynamic-multi-form.component';

describe('DynamicMultiFormComponent', () => {
  let component: DynamicMultiFormComponent;
  let fixture: ComponentFixture<DynamicMultiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicMultiFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicMultiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
