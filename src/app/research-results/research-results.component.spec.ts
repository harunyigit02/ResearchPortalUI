import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchResultsComponent } from './research-results.component';

describe('ResearchResultsComponent', () => {
  let component: ResearchResultsComponent;
  let fixture: ComponentFixture<ResearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
