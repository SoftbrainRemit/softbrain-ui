/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SoftTableColumnComponent } from './soft-table-column.component';

describe('SoftTableColumnComponent', () => {
  let component: SoftTableColumnComponent;
  let fixture: ComponentFixture<SoftTableColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftTableColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftTableColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
