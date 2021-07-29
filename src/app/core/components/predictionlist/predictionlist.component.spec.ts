import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionlistComponent } from './predictionlist.component';

describe('PredictionlistComponent', () => {
  let component: PredictionlistComponent;
  let fixture: ComponentFixture<PredictionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictionlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
