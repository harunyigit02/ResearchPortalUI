import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticleFormComponent } from './edit-article-form.component';

describe('EditArticleFormComponent', () => {
  let component: EditArticleFormComponent;
  let fixture: ComponentFixture<EditArticleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditArticleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditArticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
