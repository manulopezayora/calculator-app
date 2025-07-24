import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.html',
  styleUrl: './calculator-button.scss',
})
export class CalculatorButton {
    public equalButton = input(false, { transform: booleanAttribute });
    public specialButton = input(false, { transform: booleanAttribute });
}
