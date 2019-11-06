import { Component, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  template: `
    <span aria-busy="true" [ngClass]="{ 'big': isBig }">
      <span class="spinner" aria-hidden="true">🌀</span>
    </span>
  `,
  styles: [
    `
      @keyframes spin {
        from {
          transform: rotateZ(0deg);
        }
        to {
          transform: rotateZ(360deg);
        }
      }

      :host {
        display: block;
      }

      .spinner {
        display: inline-block;
        animation: spin 1s linear infinite;
      }

      .big {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        font-size: 50px;
        width: 50px;
        height: 50px;
      }
    `,
  ],
})
export class SpinnerComponent {
  @Input() isBig: boolean;
}
