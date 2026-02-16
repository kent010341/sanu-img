import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorInstance } from './operator-instance';

describe('OperatorInstance', () => {
  let component: OperatorInstance;
  let fixture: ComponentFixture<OperatorInstance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatorInstance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorInstance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
