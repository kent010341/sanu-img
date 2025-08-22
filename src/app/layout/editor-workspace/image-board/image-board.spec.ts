import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBoard } from './image-board';

describe('ImageBoard', () => {
  let component: ImageBoard;
  let fixture: ComponentFixture<ImageBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
