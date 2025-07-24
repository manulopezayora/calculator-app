import { computed, Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light' | 'purple';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly storageKey = 'preferred-theme';

    private themes: Record<Theme, Record<string, string>> = {
        'dark': {
            '--main-background': 'hsl(222, 26%, 31%)',
            '--toggle-background': 'hsl(223, 31%, 20%)',
            '--screen-background': 'hsl(224, 36%, 15%)',
            '--special-key-background': 'hsl(225, 21%, 49%)',
            '--special-key-background-hover': 'hsl(225, 21%, 64%)',
            '--special-key-shadow': 'hsl(224, 28%, 35%)',
            '--equal-key-background': 'hsl(6, 63%, 50%)',
            '--equal-key-background-hover': 'hsl(6, 63%, 55%)',
            '--equal-key-shadow': 'hsl(6, 70%, 34%)',
            '--key-background': 'hsl(0, 0%, 90%)',
            '--key-background-hover': 'hsl(0, 0%, 95%)',
            '--key-shadow': 'hsl(28, 16%, 65%)',
            '--key-text': 'hsl(221, 14%, 31%)',
            '--special-key-text': 'hsl(0, 100%, 100%)',
            '--equal-key-text': 'hsl(0, 100%, 100%)',
            '--screen-text': 'hsl(0, 100%, 100%)',
        },
        'light': {
            '--main-background': 'hsl(0, 0%, 90%)',
            '--toggle-background': 'hsl(0, 5%, 81%)',
            '--screen-background': 'hsl(0, 0%, 93%)',
            '--special-key-background': 'hsl(185, 42%, 37%)',
            '--special-key-background-hover': 'hsl(185, 42%, 42%)',
            '--special-key-shadow': 'hsl(185, 58%, 25%)',
            '--equal-key-background': 'hsl(25, 98%, 40%)',
            '--equal-key-background-hover': 'hsl(25, 98%, 45%)',
            '--equal-key-shadow': 'hsl(25, 99%, 27%)',
            '--key-background': 'hsl(0, 0%, 90%)',
            '--key-background-hover': 'hsl(0, 0%, 95%)',
            '--key-shadow': 'hsl(35, 11%, 61%)',
            '--key-text': 'hsl(60, 10%, 19%)',
            '--special-key-text': 'hsl(0, 100%, 100%)',
            '--equal-key-text': 'hsl(0, 100%, 100%)',
            '--screen-text': 'hsl(60, 10%, 19%)',
        },
        'purple': {
            '--main-background': 'hsl(268, 75%, 9%)',
            '--toggle-background': 'hsl(268, 71%, 12%)',
            '--screen-background': 'hsl(281, 89%, 26%)',
            '--special-key-background': 'hsl(285, 91%, 52%)',
            '--special-key-background-hover': 'hsl(285, 91%, 57%)',
            '--special-key-shadow': 'hsl(224, 28%, 35%)',
            '--equal-key-background': 'hsl(176, 100%, 44%)',
            '--equal-key-background-hover': 'hsl(176, 100%, 49%)',
            '--equal-key-shadow': 'hsl(177, 92%, 70%)',
            '--key-background': 'hsl(268, 47%, 21%)',
            '--key-background-hover': 'hsl(268, 47%, 26%)',
            '--key-shadow': 'hsl(290, 70%, 36%)',
            '--key-text': 'hsl(52, 100%, 62%)',
            '--special-key-text': 'hsl(0, 100%, 100%)',
            '--equal-key-text': 'hsl(198, 20%, 13%)',
            '--screen-text': 'hsl(52, 100%, 62%)',
        },
    };

    private currentThemeSignal = signal<Theme>(this.getInitialTheme());
    readonly currentTheme = computed(() => this.currentThemeSignal());


    constructor() {
        this.applyTheme(this.currentThemeSignal());
    }

    setTheme(theme: Theme) {
        this.currentThemeSignal.set(theme);
        localStorage.setItem(this.storageKey, theme);
        this.applyTheme(theme);
    }

    private getInitialTheme(): Theme {
        const saved = localStorage.getItem(this.storageKey) as Theme | null;
        if (saved) {
            return saved;
        };

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }

    private applyTheme(theme: Theme) {
        const themeVars = this.themes[theme];
        for (const key in themeVars) {
            document.documentElement.style.setProperty(key, themeVars[key]);
        }
    }
}
