import { booleanAttribute, Component, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
    selector: 'calculator-button',
    imports: [],
    templateUrl: './calculator-button.html',
    styleUrl: './calculator-button.scss',
})
export class CalculatorButton {
    public equalButton = input(false, { transform: booleanAttribute });
    public specialButton = input(false, { transform: booleanAttribute });
    public onClick = output<string>();
    public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

    public handleClick() {
        if (!this.contentValue()?.nativeElement) {
            return;
        }

        const value = this.contentValue()!.nativeElement.innerText;

        this.onClick.emit(value.trim());
    }
}
