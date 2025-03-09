import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnalysisComponent } from './question-analysis.component';

describe('QuestionAnalysisComponent', () => {
  let component: QuestionAnalysisComponent;
  let fixture: ComponentFixture<QuestionAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
