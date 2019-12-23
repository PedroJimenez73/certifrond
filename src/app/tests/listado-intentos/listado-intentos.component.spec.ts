import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoIntentosComponent } from './listado-intentos.component';

describe('ListadoIntentosComponent', () => {
  let component: ListadoIntentosComponent;
  let fixture: ComponentFixture<ListadoIntentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoIntentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoIntentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
