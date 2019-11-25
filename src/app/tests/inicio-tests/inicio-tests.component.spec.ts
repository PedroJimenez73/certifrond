import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioTestsComponent } from './inicio-tests.component';

describe('InicioTestsComponent', () => {
  let component: InicioTestsComponent;
  let fixture: ComponentFixture<InicioTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
