import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorButton } from "../../components/calculator-button/calculator-button";
import { ThemeConfig } from "../../components/theme-config/theme-config";

@Component({
    selector: 'app-calculator-view',
    imports: [CommonModule, FormsModule, ThemeConfig, CalculatorButton],
    templateUrl: './calculator-view.html',
    styleUrl: './calculator-view.scss'
})
export default class CalculatorView {


}
