import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateRecipePage } from './update-recipe.page';

describe('UpdateRecipePage', () => {
  let component: UpdateRecipePage;
  let fixture: ComponentFixture<UpdateRecipePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
