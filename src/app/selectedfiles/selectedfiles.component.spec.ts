import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedfilesComponent } from './selectedfiles.component';

describe('SelectedfilesComponent', () => {
  let component: SelectedfilesComponent;
  let fixture: ComponentFixture<SelectedfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedfilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
