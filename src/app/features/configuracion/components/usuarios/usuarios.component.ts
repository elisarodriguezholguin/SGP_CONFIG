import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsuarioDialogComponent } from '../../dialogs/usuario-dialog/usuario-dialog.component';

export interface Usuario {
  id: number;
  nombres: string;
  usuario: string;
  estado: 'Activo' | 'Inactivo';
  roles: string[];
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns = ['nombres', 'usuario', 'estado', 'roles', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>([]);
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  usuariosData: Usuario[] = [
    { id: 1, nombres: 'Administrador Administrador', usuario: 'admin@integrity.com', estado: 'Activo', roles: ['Administrador', 'Gerente'] },
    { id: 2, nombres: 'Andrea Angelina Orrala León', usuario: 'andrea.orrala@integritysolutions.com.ec', estado: 'Activo', roles: ['Colaborador'] },
    { id: 3, nombres: 'Diego Alberto Cedeño Cruz', usuario: 'diego.cedeno@integritysolutions.com.ec', estado: 'Activo', roles: ['Colaborador'] },
    { id: 4, nombres: 'Carmen Ledesma Vásquez', usuario: 'carmen.ledesma@integritysolutions.com.ec', estado: 'Activo', roles: ['Líder', 'Colaborador'] },
    { id: 5, nombres: 'Maylin Johanna Leon Nacipucha', usuario: 'maylin.leon@integritysolutions.com.ec', estado: 'Activo', roles: ['Colaborador', 'Recursos Humanos'] },
    { id: 6, nombres: 'Eric Steven Moya Davila', usuario: 'eric.moya@integritysolutions.com.ec', estado: 'Activo', roles: ['Colaborador'] },
    { id: 7, nombres: 'Adrián Ricardo Siavichay Vasquez', usuario: 'adrian.siavichay@integritysolutions.com.ec', estado: 'Activo', roles: ['Colaborador'] },
  ];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.dataSource.data = this.usuariosData;
      this.loading = false;
    }, 500);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  abrirDialog(usuario?: Usuario): void {
    const ref = this.dialog.open(UsuarioDialogComponent, {
      width: '560px',
      data: usuario ? { ...usuario } : null,
    });
    ref.afterClosed().subscribe((result) => {
      if (result) this.snackBar.open('Usuario guardado correctamente', 'OK', { duration: 2500 });
    });
  }

  getInitials(nombres: string): string {
    return nombres.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
  }

  avatarBg(nombres: string): string {
    const colors = ['#EEF3FD','#EAF3DE','#FBEAF0','#FAEEDA','#E1F5EE'];
    return colors[nombres.charCodeAt(0) % colors.length];
  }

  avatarColor(nombres: string): string {
    const colors = ['#1D5FD9','#3B6D11','#993556','#854F0B','#0F6E56'];
    return colors[nombres.charCodeAt(0) % colors.length];
  }

  get totalActivos(): number { return this.dataSource.data.filter((u) => u.estado === 'Activo').length; }
  get totalInactivos(): number { return this.dataSource.data.filter((u) => u.estado === 'Inactivo').length; }
}