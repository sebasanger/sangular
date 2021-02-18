import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nopage404Component } from './nopage404.component';

describe('Nopage404Component', () => {
  let component: Nopage404Component;
  let fixture: ComponentFixture<Nopage404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Nopage404Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Nopage404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
