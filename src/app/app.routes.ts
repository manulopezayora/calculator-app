import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./calculator/view/calculator-view/calculator-view')
    },
    {
        path: '**',
        redirectTo: ''
    }
];
