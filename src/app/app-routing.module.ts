import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameView } from './game/views/home/game.view';

const routes: Routes = [
  {
    path: '',
    component: GameView,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
