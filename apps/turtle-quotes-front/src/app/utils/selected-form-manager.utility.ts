import { BehaviorSubject } from 'rxjs';

export class SelectedFormManager {
  private $selected = new BehaviorSubject('');

  getSelectedForm() {
    return this.$selected.asObservable();
  }

  getSelectedFormValue() {
    return this.$selected.getValue();
  }

  setSelectedForm(value: string) {
    this.$selected.next(value);
  }
}
