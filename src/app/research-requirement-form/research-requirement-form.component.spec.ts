import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchRequirementFormComponent } from './research-requirement-form.component';

describe('ResearchRequirementFormComponent', () => {
  let component: ResearchRequirementFormComponent;
  let fixture: ComponentFixture<ResearchRequirementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchRequirementFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchRequirementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
