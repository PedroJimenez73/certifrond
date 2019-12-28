import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenIntentosComponent } from './resumen-intentos.component';

describe('ResumenIntentosComponent', () => {
  let component: ResumenIntentosComponent;
  let fixture: ComponentFixture<ResumenIntentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenIntentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenIntentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
