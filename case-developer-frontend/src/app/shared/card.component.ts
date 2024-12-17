import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  styles: `
  :host {
    display: block;
    border: 1px solid lightgray;
    border-radius: 12px;
    margin: 1em;
    padding: 0 1em 1em;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent { }
