import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceEditComponent } from './appliance-edit.component';

describe('ApplianceEditComponent', () => {
  let component: ApplianceEditComponent;
  let fixture: ComponentFixture<ApplianceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
