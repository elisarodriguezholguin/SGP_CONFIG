import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DiasFestivosComponent } from './components/dias-festivos/dias-festivos.component';

const routes: Routes = [
  { path: '',          redirectTo: 'roles', pathMatch: 'full' },
  { path: 'roles',     component: RolesComponent },
  { path: 'usuarios',  component: UsuariosComponent },
  { path: 'holidays',  component: DiasFestivosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionRoutingModule {}