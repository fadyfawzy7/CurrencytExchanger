import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanalComponent } from './panal.component';

describe('PanalComponent', () => {
  let component: PanalComponent;
  let fixture: ComponentFixture<PanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
