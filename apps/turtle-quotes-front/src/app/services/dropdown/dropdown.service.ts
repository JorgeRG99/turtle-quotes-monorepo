import { Injectable } from '@angular/core';
import { SubjectManager } from '../../utils/subject-manager.utility';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  dropdownDisplayManager = new SubjectManager(false);
}
