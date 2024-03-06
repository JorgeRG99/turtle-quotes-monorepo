import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogoComponent } from '../user-logo/user-logo.component';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { SubjectManager } from '../../../../utils/subject-manager.utility';

@Component({
  selector: 'app-logged-dropdown-menu',
  standalone: true,
  imports: [CommonModule, UserLogoComponent],
  templateUrl: './logged-dropdown-menu.component.html',
  styleUrl: './logged-dropdown-menu.component.css',
})
export class LoggedDropdownMenuComponent {
  authService = inject(AuthenticationService);
  sessionUserData$ = this.authService.getSessionData();
  dropdownDisplayManager = new SubjectManager(false);
  isDropdownOpen$ = this.dropdownDisplayManager.getSubject();

  logout() {
    this.authService.logout();
  }

  toggleOpenDropdownMenu() {
    this.dropdownDisplayManager.setSubject(!this.dropdownDisplayManager.getSubjectValue());
  }
}
