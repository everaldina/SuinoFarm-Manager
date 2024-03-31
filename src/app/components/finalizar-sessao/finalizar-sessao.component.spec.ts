import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarSessaoComponent } from './finalizar-sessao.component';

describe('FinalizarSessaoComponent', () => {
  let component: FinalizarSessaoComponent;
  let fixture: ComponentFixture<FinalizarSessaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalizarSessaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalizarSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
