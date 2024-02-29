import { BehaviorSubject } from 'rxjs';

export class SelectedFormManager {
  private $selected = new BehaviorSubject('');

  getSelectedForm() {
    return this.$selected.asObservable();
  }

  setSelectedForm(value: string) {
    this.$selected.next(value);
  }
}
