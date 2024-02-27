import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';
import { GameComponent } from './components/game/game.component';
import { APP_ROUTES } from '../config';
import { RegisterComponent } from './components/register/register.component';

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
    path: APP_ROUTES.REGISTER,
    component: RegisterComponent
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
