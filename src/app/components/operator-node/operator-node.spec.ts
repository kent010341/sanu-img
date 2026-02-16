import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorNode } from './operator-node';

describe('OperatorNode', () => {
  let component: OperatorNode;
  let fixture: ComponentFixture<OperatorNode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatorNode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorNode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
