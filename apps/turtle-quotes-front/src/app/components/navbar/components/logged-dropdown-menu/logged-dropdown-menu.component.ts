import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogoComponent } from '../user-logo/user-logo.component';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { LogoutIconComponent } from './components/logout-icon/logout-icon.component';
import { SettingsIconComponent } from './components/settings-icon/settings-icon.component';
import { UserIconComponent } from './components/user-icon/user-icon.component';
import { APP_ROUTES } from '../../../../../config';
import { Router, RouterLink } from '@angular/router';
import { DropdownService } from '../../../../services/dropdown/dropdown.service';

@Component({
  selector: 'app-logged-dropdown-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    UserLogoComponent,
    LogoutIconComponent,
    SettingsIconComponent,
    UserIconComponent,
  ],
  templateUrl: './logged-dropdown-menu.component.html',
  styleUrl: './logged-dropdown-menu.component.css',
})
export class LoggedDropdownMenuComponent {
  @ViewChild('openDialogButton')
  openDialogButton!: ElementRef<HTMLButtonElement>;
  router = inject(Router);
  dropdownServiceManager = inject(DropdownService).dropdownDisplayManager;
  routes = { ...APP_ROUTES };
  authService = inject(AuthenticationService);
  isDropdownOpen$ = this.dropdownServiceManager.getSubject();

  logout() {
    this.authService.logout();
    this.toggleOpenDropdownMenu();
  }

  toggleOpenDropdownMenu() {
    this.dropdownServiceManager.setSubject(
      !this.dropdownServiceManager.getSubjectValue()
    );
    this.openDialogButton.nativeElement.blur();
  }

  onNavigateAndClose(targetRoute: string): void {
    this.dropdownServiceManager.setSubject(false);
    this.router.navigate([targetRoute]);
  }
}
