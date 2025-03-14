import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequirementsFormComponent } from './edit-requirements-form.component';

describe('EditRequirementsFormComponent', () => {
  let component: EditRequirementsFormComponent;
  let fixture: ComponentFixture<EditRequirementsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRequirementsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRequirementsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
