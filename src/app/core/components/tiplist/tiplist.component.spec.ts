import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiplistComponent } from './tiplist.component';

describe('TiplistComponent', () => {
  let component: TiplistComponent;
  let fixture: ComponentFixture<TiplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiplistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
