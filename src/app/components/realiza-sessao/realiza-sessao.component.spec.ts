import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizaSessaoComponent } from './realiza-sessao.component';

describe('RealizaSessaoComponent', () => {
  let component: RealizaSessaoComponent;
  let fixture: ComponentFixture<RealizaSessaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealizaSessaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealizaSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
