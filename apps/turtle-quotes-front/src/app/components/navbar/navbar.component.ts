import { Component, inject } from '@angular/core';
import { PageLogoComponent } from './components/page-logo/page-logo.component';
import { RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../config';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [PageLogoComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  routes = { ...APP_ROUTES };

  dialogService = inject(DialogService);

  openAuthDialog(selectedForm: string) {
    this.dialogService.openDialog(selectedForm);
  }
}
