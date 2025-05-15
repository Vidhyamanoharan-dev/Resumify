import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParsedResumesComponent } from './parsed-resumes.component';

describe('ParsedResumesComponent', () => {
  let component: ParsedResumesComponent;
  let fixture: ComponentFixture<ParsedResumesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParsedResumesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParsedResumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
