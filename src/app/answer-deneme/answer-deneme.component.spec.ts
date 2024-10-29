import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerDenemeComponent } from './answer-deneme.component';

describe('AnswerDenemeComponent', () => {
  let component: AnswerDenemeComponent;
  let fixture: ComponentFixture<AnswerDenemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerDenemeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerDenemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
