import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchListComponent } from './research-list.component';

describe('ResearchListComponent', () => {
  let component: ResearchListComponent;
  let fixture: ComponentFixture<ResearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
