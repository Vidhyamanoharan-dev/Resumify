import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeEnhancingComponent } from './resume-enhancing.component';

describe('ResumeEnhancingComponent', () => {
  let component: ResumeEnhancingComponent;
  let fixture: ComponentFixture<ResumeEnhancingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeEnhancingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeEnhancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
