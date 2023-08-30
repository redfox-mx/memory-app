import { NgModule } from '@angular/core'
import { HeaderComponent } from './header/header'
import { CommonModule } from '@angular/common'
import { IconsModule } from '../icons'


@NgModule({
  declarations: [ HeaderComponent ],
  imports: [ CommonModule, IconsModule ],
  exports: [ HeaderComponent ]
})
export class LayoutModule {}
