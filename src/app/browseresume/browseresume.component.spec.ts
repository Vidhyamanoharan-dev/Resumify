import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseResumeComponent } from './browseresume.component';

describe('BrowseResumeComponent', () => {
  let component: BrowseResumeComponent;
  let fixture: ComponentFixture<BrowseResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});