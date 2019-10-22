import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComptePage } from './list-compte.page';

describe('ListComptePage', () => {
  let component: ListComptePage;
  let fixture: ComponentFixture<ListComptePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComptePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComptePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
