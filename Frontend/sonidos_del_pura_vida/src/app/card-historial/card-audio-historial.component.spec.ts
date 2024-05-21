import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAudioHistorialComponent } from './card-audio-historial.component';

describe('CardAudioHistorialComponent', () => {
  let component: CardAudioHistorialComponent;
  let fixture: ComponentFixture<CardAudioHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardAudioHistorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardAudioHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
