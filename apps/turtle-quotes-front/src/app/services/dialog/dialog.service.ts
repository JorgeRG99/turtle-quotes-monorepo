import { Injectable } from '@angular/core';
import { SubjectManager } from '../../utils/subject-manager.utility';
import { SelectedFormManager } from '../../utils/selected-form-manager.utility';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  $dialogSubject = new SubjectManager(false);
  $selectedForm = new SelectedFormManager();

  
  public setSelectedForm(value: string) {
    this.$selectedForm.setSelectedForm(value);
  }

  public openDialog(selectedForm: string) {
    this.$dialogSubject.setSubject(true);
    this.$selectedForm.setSelectedForm(selectedForm);
  }
}
