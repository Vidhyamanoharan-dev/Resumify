import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadresumeComponent } from './uploadresume.component';

describe('UploadresumeComponent', () => {
  let component: UploadresumeComponent;
  let fixture: ComponentFixture<UploadresumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadresumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
