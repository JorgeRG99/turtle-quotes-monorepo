import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog/dialog.service';
import { Observable } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../models';

@Component({
  selector: 'app-authentication-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './authentication-dialog.component.html',
  styleUrl: './authentication-dialog.component.css',
})
export class AuthenticationDialogComponent implements OnInit {
  dialogService = inject(DialogService);
  authenticationService = inject(AuthenticationService);
  formBuilder = inject(FormBuilder);
  $selectedForm!: Observable<string>;
  authForm!: FormGroup;
  isLoadingResponse$!: Observable<boolean>;

  ngOnInit() {
    this.authForm = this.initForm();
    this.$selectedForm = this.dialogService.$selectedForm.getSelectedForm();
    this.isLoadingResponse$ = this.authenticationService.getIsLoadingResponse();
  }

  closeAuthDialog(e?: Event) {
    e?.preventDefault();
    this.dialogService.$dialogSubject.setSubject(false);
  }

  changeSelectedForm(selectedForm: string, e: Event) {
    e.preventDefault();
    this.dialogService.$selectedForm.setSelectedForm(selectedForm);
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.minLength(3), Validators.maxLength(100)]],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.email,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  onSubmit() {
    this.authenticationService.setItsLoadingResponse(true);
    const action = this.getFormActionOnSubmit(
      this.dialogService.$selectedForm.getSelectedFormValue()
    );

    const formValue = this.authForm.value;
    const credentials = {
      username: formValue.username ?? '',
      email: formValue.email ?? '',
      password: formValue.password ?? '',
    };

    action(credentials).subscribe({
      next: () => {
        this.closeAuthDialog();
      },
      complete: () => {
        this.authenticationService.setItsLoadingResponse(false);
      },
    });
  }

  fieldErrorMessage(field: AbstractControl | null): string {
    if (!field || !field.errors || !field.touched) {
      return '';
    }

    if (field.errors['required']) {
      return 'Required field';
    }

    if (field.errors['minlength']) {
      return `Minimum length ${field.errors['minlength'].requiredLength} characters`;
    }

    if (field.errors['email']) {
      return `Invalid email format`;
    }

    if (field.errors['maxlength']) {
      return `Maximum length ${field.errors['maxlength'].requiredLength} characters`;
    }

    return '';
  }

  getFormActionOnSubmit(selectedForm: string) {
    if (selectedForm === 'register')
      return (credentials: User) =>
        this.authenticationService.register(credentials);

    return (credentials: User) => this.authenticationService.login(credentials);
  }
}
