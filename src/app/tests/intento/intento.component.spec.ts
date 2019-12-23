import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentoComponent } from './intento.component';

describe('IntentoComponent', () => {
  let component: IntentoComponent;
  let fixture: ComponentFixture<IntentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
