import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog/dialog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authentication-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authentication-dialog.component.html',
  styleUrl: './authentication-dialog.component.css',
})
export class AuthenticationDialogComponent {
  dialogService = inject(DialogService);
  $selectedForm!: Observable<string>;

  constructor() {
    this.$selectedForm = this.dialogService.$selectedForm.getSelectedForm();
  }

  closeAuthDialog(e: Event) {
    e.preventDefault();
    this.dialogService.$dialogSubject.setSubject(false);
  }

  changeSelectedForm(selectedForm: string, e: Event) {
    e.preventDefault();
    this.dialogService.$selectedForm.setSelectedForm(selectedForm);
  }
}
