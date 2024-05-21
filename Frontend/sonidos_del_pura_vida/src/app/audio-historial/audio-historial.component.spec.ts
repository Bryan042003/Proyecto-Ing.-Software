import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioHistorialComponent } from './audio-historial.component';

describe('AudioHistorialComponent', () => {
  let component: AudioHistorialComponent;
  let fixture: ComponentFixture<AudioHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioHistorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudioHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
