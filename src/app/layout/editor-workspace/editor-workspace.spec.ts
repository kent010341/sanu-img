import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorWorkspace } from './editor-workspace';

describe('EditorWorkspace', () => {
  let component: EditorWorkspace;
  let fixture: ComponentFixture<EditorWorkspace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorWorkspace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorWorkspace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
