import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteRecipePage } from './delete-recipe.page';

describe('DeleteRecipePage', () => {
  let component: DeleteRecipePage;
  let fixture: ComponentFixture<DeleteRecipePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
