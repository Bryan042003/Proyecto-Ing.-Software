import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeAudiosComponent } from './gestion-de-audios.component';

describe('GestionDeAudiosComponent', () => {
  let component: GestionDeAudiosComponent;
  let fixture: ComponentFixture<GestionDeAudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionDeAudiosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionDeAudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
