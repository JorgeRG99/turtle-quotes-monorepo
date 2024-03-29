import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';
import { GameComponent } from './components/game/game.component';
import { APP_ROUTES } from '../config';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  {
    path: APP_ROUTES.HOME,
    component: GameComponent,
  },
  {
    path: APP_ROUTES.STATS,
    component: StatsComponent,
  },
  {
    path: APP_ROUTES.PROFILE,
    component: ProfileComponent,
  },
  {
    path: '**',
    redirectTo: APP_ROUTES.HOME,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}
