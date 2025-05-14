import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParsedresumeComponent } from './parsedresume.component';

describe('ParsedresumeComponent', () => {
  let component: ParsedresumeComponent;
  let fixture: ComponentFixture<ParsedresumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParsedresumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParsedresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
