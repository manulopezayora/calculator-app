import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorView } from './calculator-view';

describe('CalculatorView', () => {
  let component: CalculatorView;
  let fixture: ComponentFixture<CalculatorView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
