import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionDenemeComponent } from './condition-deneme.component';

describe('ConditionDenemeComponent', () => {
  let component: ConditionDenemeComponent;
  let fixture: ComponentFixture<ConditionDenemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionDenemeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionDenemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
