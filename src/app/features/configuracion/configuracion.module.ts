import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FullCalendarModule } from '@fullcalendar/angular';

// Components
import { RolesComponent } from './components/roles/roles.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DiasFestivosComponent } from './components/dias-festivos/dias-festivos.component';
import { RolDialogComponent } from './dialogs/rol-dialog/rol-dialog.component';
import { UsuarioDialogComponent } from './dialogs/usuario-dialog/usuario-dialog.component';
import { FeriadoDialogComponent } from './dialogs/feriado-dialog/feriado-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfiguracionRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    FullCalendarModule,
    // Standalone components van aquí
    RolesComponent,
    UsuariosComponent,
    DiasFestivosComponent,
    RolDialogComponent,
    UsuarioDialogComponent,
    FeriadoDialogComponent,
  ],
})
export class ConfiguracionModule {}