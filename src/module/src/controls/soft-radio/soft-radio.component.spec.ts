/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SoftRadioComponent } from './soft-radio.component';

describe('SoftRadioComponent', () => {
  let component: SoftRadioComponent;
  let fixture: ComponentFixture<SoftRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
