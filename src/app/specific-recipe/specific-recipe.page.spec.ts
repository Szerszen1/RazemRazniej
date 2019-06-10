import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificRecipePage } from './specific-recipe.page';

describe('SpecificRecipePage', () => {
  let component: SpecificRecipePage;
  let fixture: ComponentFixture<SpecificRecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificRecipePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
