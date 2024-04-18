import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarInfoAudiosComponent } from './visualizar-info-audios.component';

describe('VisualizarInfoAudiosComponent', () => {
  let component: VisualizarInfoAudiosComponent;
  let fixture: ComponentFixture<VisualizarInfoAudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizarInfoAudiosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarInfoAudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
