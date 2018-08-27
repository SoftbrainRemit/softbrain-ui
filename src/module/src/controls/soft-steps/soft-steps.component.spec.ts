/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SoftStepsComponent } from './soft-steps.component';

describe('SoftStepsComponent', () => {
  let component: SoftStepsComponent;
  let fixture: ComponentFixture<SoftStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
