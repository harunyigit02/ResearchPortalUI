import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnPublishedResearchListComponent } from './un-published-research-list.component';

describe('UnPublishedResearchListComponent', () => {
  let component: UnPublishedResearchListComponent;
  let fixture: ComponentFixture<UnPublishedResearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnPublishedResearchListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnPublishedResearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
