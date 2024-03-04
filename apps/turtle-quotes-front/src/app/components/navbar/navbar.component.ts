import { Component, inject } from '@angular/core';
import { PageLogoComponent } from './components/page-logo/page-logo.component';
import { RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../config';
import { DialogService } from '../../services/dialog/dialog.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [PageLogoComponent, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  routes = { ...APP_ROUTES };
  dialogService = inject(DialogService);
  authService = inject(AuthenticationService);
  isAuthenticated$ = this.authService.getIsAuthenticated();

  openAuthDialog(selectedForm: string) {
    this.dialogService.openDialog(selectedForm);
  }

  logout() {
    this.authService.logout()
  }
}
