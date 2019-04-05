import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRenderComponent } from './button-render.component';

describe('ButtonRenderComponent', () => {
  let component: ButtonRenderComponent;
  let fixture: ComponentFixture<ButtonRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
