import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordEyeRendrerComponent } from './password-eye-rendrer.component';

describe('PasswordEyeRendrerComponent', () => {
  let component: PasswordEyeRendrerComponent;
  let fixture: ComponentFixture<PasswordEyeRendrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordEyeRendrerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordEyeRendrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
