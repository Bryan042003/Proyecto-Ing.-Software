import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEdicionAudioComponent } from './confirmar-edicion-audio.component';

describe('ConfirmarEdicionAudioComponent', () => {
  let component: ConfirmarEdicionAudioComponent;
  let fixture: ComponentFixture<ConfirmarEdicionAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmarEdicionAudioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmarEdicionAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
