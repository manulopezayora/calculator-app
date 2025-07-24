import { NgStyle } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Theme, ThemeService } from '../../services/theme-service';

@Component({
    selector: 'theme-config',
    imports: [NgStyle],
    templateUrl: './theme-config.html',
    styleUrl: './theme-config.scss'
})
export class ThemeConfig {
    private themeService = inject(ThemeService);
    themes: Theme[] = ['dark', 'light', 'purple'];

    public theme = computed(() => this.themeService.currentTheme());

    public onThemeChange(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.themeService.setTheme(this.themes[Number(value)]);
    }

    public getThumbPosition(): string {
        switch (this.themeService.currentTheme()) {
            case 'dark':
                return '3px';
            case 'light':
                return '25px';
            case 'purple':
                return '47px';
            default:
                return '3px';
        }
    }
}
