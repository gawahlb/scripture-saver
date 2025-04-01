import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptureEditComponent } from './scripture-edit.component';

describe('ScriptureEditComponent', () => {
  let component: ScriptureEditComponent;
  let fixture: ComponentFixture<ScriptureEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScriptureEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScriptureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
