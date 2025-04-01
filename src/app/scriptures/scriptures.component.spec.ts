import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScripturesComponent } from './scriptures.component';

describe('ScripturesComponent', () => {
  let component: ScripturesComponent;
  let fixture: ComponentFixture<ScripturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScripturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScripturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
