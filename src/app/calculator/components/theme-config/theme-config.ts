import { NgStyle } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Theme, ThemeService } from '../../services/theme/theme-service';

const THEMES: Theme[] = ['dark', 'light', 'purple']

@Component({
    selector: 'theme-config',
    imports: [NgStyle],
    templateUrl: './theme-config.html',
    styleUrl: './theme-config.scss'
})
export class ThemeConfig {
    private themeService = inject(ThemeService);

    public theme = computed(() => this.themeService.currentTheme());

    public onToggleClick(event: MouseEvent): void {
        const toggle = (event.currentTarget as HTMLElement);
        const rect = toggle.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const segmentWidth = rect.width / 3;

        const newValue = Math.floor(clickX / segmentWidth);
        this.themeService.setTheme(THEMES[newValue]);
    }

    public onThemeChange(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.themeService.setTheme(THEMES[Number(value)]);
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
