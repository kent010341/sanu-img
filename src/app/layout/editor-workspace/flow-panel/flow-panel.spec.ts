import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowPanel } from './flow-panel';

describe('FlowPanel', () => {
  let component: FlowPanel;
  let fixture: ComponentFixture<FlowPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
