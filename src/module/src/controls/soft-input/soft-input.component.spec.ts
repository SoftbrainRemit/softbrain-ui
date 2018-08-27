/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SoftInputComponent } from './soft-input.component';

describe('SoftInputComponent', () => {
  let component: SoftInputComponent;
  let fixture: ComponentFixture<SoftInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
