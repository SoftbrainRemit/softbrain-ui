/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SoftCopyComponent } from './soft-copy.component';

describe('SoftCopyComponent', () => {
  let component: SoftCopyComponent;
  let fixture: ComponentFixture<SoftCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
