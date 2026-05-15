import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'configuracion', pathMatch: 'full' },
  {
    path: 'configuracion',
    loadChildren: () =>
      import('./features/configuracion/configuracion.module').then(
        (m) => m.ConfiguracionModule
      ),
  },
];