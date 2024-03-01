import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog/dialog.service';
import { Observable } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentication-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './authentication-dialog.component.html',
  styleUrl: './authentication-dialog.component.css',
})
export class AuthenticationDialogComponent {
  dialogService = inject(DialogService);
  $selectedForm!: Observable<string>;

  authForm = this.formBuilder.group({
    name: [''],
    email: [''],
    password: ['']
  });

  constructor(private formBuilder: FormBuilder) {
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

  onSubmit() {
    fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.authForm.value)
    })
  }
}
