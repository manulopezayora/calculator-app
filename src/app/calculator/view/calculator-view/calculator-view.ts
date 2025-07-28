import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorButton } from "../../components/calculator-button/calculator-button";
import { ThemeConfig } from "../../components/theme-config/theme-config";
import { CalculatorService } from '../../services/calculator/calculator-service';

const KEY_EQUIVALENTS: Record<string, string> = {
    Backspace: 'DEL',
    Delete: 'RESET',
    X: '*',
    x: '*',
    Enter: '=',
}

@Component({
    selector: 'app-calculator-view',
    imports: [CommonModule, FormsModule, ThemeConfig, CalculatorButton],
    templateUrl: './calculator-view.html',
    styleUrl: './calculator-view.scss',
    host: {
        '(document:keyup)': 'handleKeyBoardEvent($event)'
    }
})
export default class CalculatorView {

    public calculatorService = inject(CalculatorService);

    public resultText = computed<string>(() => this.calculatorService.resultText());
    public subResultText = computed<string>(() => this.calculatorService.subResultText());
    public lastOperator = computed<string>(() => this.calculatorService.lastOperator());

    public handleClick(key: string): void {
        this.calculatorService.constructNumber(KEY_EQUIVALENTS[key] ?? key);
    }

    public handleKeyBoardEvent(event: KeyboardEvent): void {
        const key = event.key;
        const keyValue = KEY_EQUIVALENTS[key] ?? key;
        this.handleClick(keyValue);
    }
}
