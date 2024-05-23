import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEliminacionAdminComponent } from './confirmar-eliminacion-admin.component';

describe('ConfirmarEliminacionAdminComponent', () => {
  let component: ConfirmarEliminacionAdminComponent;
  let fixture: ComponentFixture<ConfirmarEliminacionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmarEliminacionAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmarEliminacionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
