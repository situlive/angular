import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituAngularComponentsComponent } from './situ-angular-components.component';

describe('SituAngularComponentsComponent', () => {
  let component: SituAngularComponentsComponent;
  let fixture: ComponentFixture<SituAngularComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituAngularComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituAngularComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
