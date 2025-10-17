import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameGuidlinesComponent } from './username-guidlines.component';

describe('UsernameGuidlinesComponent', () => {
  let component: UsernameGuidlinesComponent;
  let fixture: ComponentFixture<UsernameGuidlinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsernameGuidlinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsernameGuidlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
