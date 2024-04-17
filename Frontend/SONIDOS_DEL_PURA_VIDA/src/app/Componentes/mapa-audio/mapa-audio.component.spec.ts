import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaAudioComponent } from './mapa-audio.component';

describe('MapaAudioComponent', () => {
  let component: MapaAudioComponent;
  let fixture: ComponentFixture<MapaAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapaAudioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapaAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
