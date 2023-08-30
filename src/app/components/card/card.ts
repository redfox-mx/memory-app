import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface SelectedOutput {
  flipped: boolean;
}

function generateA11yCardName(name?: string) {
  return `${name} card`
}

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrls: ['./card.scss']
})
export class CardComponent {

  /** card is flipped or not */
  @Input()
  public flipped = false;

  /**
   * Name of the card, this must be screen reader friendly since this name
   * will be used to anounce card content
   */
  @Input()
  name?: string;

  @Input()
  src?: string;

  assistiveDescription() {
    return this.flipped ? generateA11yCardName(this.name) : 'hidden card';
  }


}

