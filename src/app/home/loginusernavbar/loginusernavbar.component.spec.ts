import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginusernavbarComponent } from './loginusernavbar.component';

describe('LoginusernavbarComponent', () => {
  let component: LoginusernavbarComponent;
  let fixture: ComponentFixture<LoginusernavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginusernavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginusernavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
