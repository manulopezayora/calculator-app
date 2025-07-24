import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', 'x', '/'];
const specialOperators = ['%', '.', '=', 'DEL', 'RESET', 'Backspace'];

@Injectable({
    providedIn: 'root'
})
export class CalculatorService {
    public resultText = signal('0');
    public subResultText = signal('0');
    public lastOperator = signal('+');

    public constructNumber(value: string): void {
        if (![...numbers, ...operators, ...specialOperators].includes(value)) {
            console.warn('Invalid input', value);

            return;
        }

        if (this.resultText().length >= 10) {
            console.error('Max length reached');

            return;
        }

        if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
            return;
        }

        if (this.resultText() === '0' && operators.includes(value) && value !== '-') {
            return;
        }

        if (value === '=') {
            this.calculateResult();

            return;
        }

        if (value === 'RESET') {
            this.resetCalculator();

            return;
        }

        if (value === 'DEL') {
            this.deleteLastNumber();

            return;
        }

        if (this.resultText() === '0' && value === '-') {
            this.changeToNegativeNumber();

            return;
        }

        if (operators.includes(value)) {
            this.addOperatorToCalculate(value);

            return;
        }

        if (value === '.' && !this.resultText().includes('.')) {
            this.addDecimals();

            return;
        }

        if (numbers.includes(value)) {
            this.setCalculatorNumbers(value);

            return;
        }

    }

    private calculateResult(): void {
        const number1 = parseFloat(this.subResultText());
        const number2 = parseFloat(this.resultText());

        let result = 0;

        switch (this.lastOperator()) {
            case '+':
                result = number1 + number2;
                break;
            case '-':
                result = number1 - number2;
                break;
            case '*':
                result = number1 * number2;
                break;
            case '/':
                result = number1 / number2;
                break;
        }

        this.resultText.set(result.toString());
        this.subResultText.set('0');
        this.lastOperator.set('+');
    }

    private resetCalculator(): void {
        this.resultText.set('0');
        this.subResultText.set('0');
        this.lastOperator.set('+');

        return;
    }

    private deleteLastNumber(): void {
        if (this.resultText() === '0') {

            return;
        }

        if (this.resultText().includes('-') && this.resultText().length === 2) {
            this.resultText.set('0');

            return;
        }

        if (this.resultText().length === 1) {
            this.resultText.set('0');

            return;
        }

        this.resultText.update((currentValue) => currentValue.slice(0, -1));

        return;
    }

    private setCalculatorNumbers(value: string): void {
        if (this.resultText() === '0') {
            this.resultText.set(value);

            return;
        }

        if (this.resultText() === '-0') {
            this.resultText.set('-' + value);

            return;
        }

        this.resultText.update((currentValue) => currentValue + value);

        return;
    }

    private addOperatorToCalculate(value: string): void {
        this.calculateResult();
        this.lastOperator.set(value);
        this.subResultText.set(this.resultText());
        this.resultText.set('0');

        return;
    }

    private addDecimals(): void {
        if (this.resultText() === '0' || this.resultText() === '') {
            this.resultText.set('0.');

            return;
        }

        this.resultText.update((currentValue) => currentValue + '.');

        return;
    }

    private changeToNegativeNumber() {
        if (this.resultText().includes('-')) {
            this.resultText.update((currentValue) => currentValue.slice(1));

            return;
        }

        this.resultText.update(currentValue => '-' + currentValue);

        return;
    }

}
