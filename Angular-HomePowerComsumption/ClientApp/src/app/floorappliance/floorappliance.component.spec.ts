import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorapplianceComponent } from './floorappliance.component';

describe('FloorapplianceComponent', () => {
  let component: FloorapplianceComponent;
  let fixture: ComponentFixture<FloorapplianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorapplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorapplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
