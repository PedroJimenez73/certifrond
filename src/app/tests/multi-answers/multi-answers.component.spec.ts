import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiAnswersComponent } from './multi-answers.component';

describe('MultiAnswersComponent', () => {
  let component: MultiAnswersComponent;
  let fixture: ComponentFixture<MultiAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
