import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadCalendarioComponent } from './disponibilidad-calendario.component';

describe('DisponibilidadCalendarioComponent', () => {
  let component: DisponibilidadCalendarioComponent;
  let fixture: ComponentFixture<DisponibilidadCalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisponibilidadCalendarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisponibilidadCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
