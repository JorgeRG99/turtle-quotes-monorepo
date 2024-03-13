import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsService } from '../../../../services/stats/stats.service';
import { CrownIconComponent } from '../crown-icon/crown-icon.component';

@Component({
  selector: 'app-ranking-table',
  standalone: true,
  imports: [CommonModule, CrownIconComponent],
  templateUrl: './ranking-table.component.html',
  styleUrl: './ranking-table.component.css',
})
export class RankingTableComponent {
  rankingStats$ = inject(StatsService).getApiRankingResult()
}
