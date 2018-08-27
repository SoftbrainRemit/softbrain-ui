/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SoftBackDropComponent } from './soft-back-drop.component';

describe('SoftBackDropComponent', () => {
  let component: SoftBackDropComponent;
  let fixture: ComponentFixture<SoftBackDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftBackDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftBackDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
