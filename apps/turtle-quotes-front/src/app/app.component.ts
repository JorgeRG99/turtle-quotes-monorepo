import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthenticationDialogComponent } from './components/authentication-dialog/authentication-dialog.component';
import { DialogService } from './services/dialog/dialog.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, AuthenticationDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Turtle Quotes | Improve Your Typing Skills with Famous Quotes';
  dialogService = inject(DialogService);
  isOpenAuthDialog$!:Observable<boolean>;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.isOpenAuthDialog$ = this.dialogService.$dialogSubject.getSubject();
  }
}
