import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResearchFormComponent } from './edit-research-form.component';

describe('EditResearchFormComponent', () => {
  let component: EditResearchFormComponent;
  let fixture: ComponentFixture<EditResearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditResearchFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditResearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
