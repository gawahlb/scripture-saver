import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptureDetailComponent } from './scripture-detail.component';

describe('ScriptureDetailComponent', () => {
  let component: ScriptureDetailComponent;
  let fixture: ComponentFixture<ScriptureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScriptureDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScriptureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
