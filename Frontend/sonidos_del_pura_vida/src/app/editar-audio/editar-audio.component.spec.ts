import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAudioComponent } from './editar-audio.component';

describe('EditarAudioComponent', () => {
  let component: EditarAudioComponent;
  let fixture: ComponentFixture<EditarAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarAudioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
