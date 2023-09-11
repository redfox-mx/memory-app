import { Injector, NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

/**
 * Allow setup mat icons module
 * @param registry icon registry for icons services
 */
export function bootstrapIcons(registry: MatIconRegistry) {
  registry.setDefaultFontSetClass('material-symbols-rounded')
}


/**
 * Facade over ´MatIconModule´ and custom icon typography
 */
@NgModule({
  imports: [MatIconModule],
  exports: [MatIconModule]
})
export class IconsModule {

  constructor(injector: Injector) {
    const matIconRegistry = injector.get(MatIconRegistry)
    bootstrapIcons(matIconRegistry);
  }
}
