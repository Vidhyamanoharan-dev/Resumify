import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedFilesComponent } from './selectedfiles.component';



describe('SelectedfilesComponent', () => {
  let component: SelectedFilesComponent;
  let fixture: ComponentFixture<SelectedFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedFilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});