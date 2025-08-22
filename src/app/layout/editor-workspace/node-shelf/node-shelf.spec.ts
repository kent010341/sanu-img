import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeShelf } from './node-shelf';

describe('NodeShelf', () => {
  let component: NodeShelf;
  let fixture: ComponentFixture<NodeShelf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeShelf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeShelf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
