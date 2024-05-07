import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeAdministradoresComponent } from './gestion-de-administradores.component';

describe('GestionDeAdministradoresComponent', () => {
  let component: GestionDeAdministradoresComponent;
  let fixture: ComponentFixture<GestionDeAdministradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionDeAdministradoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionDeAdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
