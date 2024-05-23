import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEdicionAdminComponent } from './confirmar-edicion-admin.component';

describe('ConfirmarEdicionAdminComponent', () => {
  let component: ConfirmarEdicionAdminComponent;
  let fixture: ComponentFixture<ConfirmarEdicionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmarEdicionAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmarEdicionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
