import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarRecetasThemealbdPage } from './buscar-recetas-themealbd.page';

describe('BuscarRecetasThemealbdPage', () => {
  let component: BuscarRecetasThemealbdPage;
  let fixture: ComponentFixture<BuscarRecetasThemealbdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarRecetasThemealbdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
