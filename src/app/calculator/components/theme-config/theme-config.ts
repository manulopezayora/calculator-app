import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
    selector: 'theme-config',
    imports: [NgStyle],
    templateUrl: './theme-config.html',
    styleUrl: './theme-config.scss'
})
export class ThemeConfig {
    public theme = signal<number>(1);

    public onThemeChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.theme.set(parseInt(input.value, 10));
    }

    public getThumbPosition(): string {
        switch (this.theme()) {
            case 1:
                return '3px';
            case 2:
                return '25px';
            case 3:
                return '47px';
            default:
                return '3px';
        }
    }
}
