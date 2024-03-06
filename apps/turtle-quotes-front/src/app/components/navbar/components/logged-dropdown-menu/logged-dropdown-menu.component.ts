import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogoComponent } from '../user-logo/user-logo.component';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { SubjectManager } from '../../../../utils/subject-manager.utility';
import { LogoutIconComponent } from './components/logout-icon/logout-icon.component';
import { SettingsIconComponent } from './components/settings-icon/settings-icon.component';
import { UserIconComponent } from './components/user-icon/user-icon.component';
import { APP_ROUTES } from '../../../../../config';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-logged-dropdown-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, UserLogoComponent, LogoutIconComponent, SettingsIconComponent, UserIconComponent],
  templateUrl: './logged-dropdown-menu.component.html',
  styleUrl: './logged-dropdown-menu.component.css',
})
export class LoggedDropdownMenuComponent {
  router = inject(Router)
  routes = { ...APP_ROUTES };
  authService = inject(AuthenticationService);
  dropdownDisplayManager = new SubjectManager(false);
  isDropdownOpen$ = this.dropdownDisplayManager.getSubject();

  logout() {
    this.authService.logout();
  }

  toggleOpenDropdownMenu() {
    this.dropdownDisplayManager.setSubject(!this.dropdownDisplayManager.getSubjectValue());
  }

  onNavigateAndClose(targetRoute: string): void {
    this.dropdownDisplayManager.setSubject(false);
    this.router.navigate([targetRoute]);
  }
}
