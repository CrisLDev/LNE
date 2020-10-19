import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracingsComponent } from './tracings.component';

describe('TracingsComponent', () => {
  let component: TracingsComponent;
  let fixture: ComponentFixture<TracingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
