import { Component, inject } from '@angular/core';
import { GameService } from '../../../../services/game/game.service';
import { DropdownService } from '../../../../services/dropdown/dropdown.service';

@Component({
  selector: 'app-start-panel',
  standalone: true,
  imports: [],
  templateUrl: './start-panel.component.html',
  styleUrl: './start-panel.component.scss'
})
export class StartPanelComponent {
  gameService = inject(GameService)
  dropdonServiceManager = inject(DropdownService).dropdownDisplayManager

  closeStartDialog() {
    this.dropdonServiceManager.setSubject(false)
    this.gameService.closeStartDialog()
  }
}
