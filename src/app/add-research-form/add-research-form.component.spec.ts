import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResearchFormComponent } from './add-research-form.component';

describe('AddResearchFormComponent', () => {
  let component: AddResearchFormComponent;
  let fixture: ComponentFixture<AddResearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddResearchFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
