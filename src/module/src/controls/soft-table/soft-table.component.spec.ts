/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SoftTableComponent } from './soft-table.component';

describe('SoftTableComponent', () => {
  let component: SoftTableComponent;
  let fixture: ComponentFixture<SoftTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
