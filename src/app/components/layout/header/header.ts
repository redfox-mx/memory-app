import { Component } from '@angular/core'
import { UserStorage } from '@memory/storage'
import { GameServiceController } from 'src/app/game/services/game.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {

  constructor(
    public game: GameServiceController,
    public userStorage: UserStorage
  ) {}
}
