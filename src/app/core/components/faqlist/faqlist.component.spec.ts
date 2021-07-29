import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQlistComponent } from './faqlist.component';

describe('FAQlistComponent', () => {
  let component: FAQlistComponent;
  let fixture: ComponentFixture<FAQlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAQlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
