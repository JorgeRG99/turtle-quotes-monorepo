import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggedDropdownMenuComponent } from './logged-dropdown-menu.component';

describe('LoggedDropdownMenuComponent', () => {
  let component: LoggedDropdownMenuComponent;
  let fixture: ComponentFixture<LoggedDropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedDropdownMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoggedDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
