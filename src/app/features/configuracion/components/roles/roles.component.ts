import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RolDialogComponent } from '../../dialogs/rol-dialog/rol-dialog.component';
import { MatIconModule } from '@angular/material/icon';

export interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
  modulos: string[];
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit, AfterViewInit {
  displayedColumns = ['nombre', 'descripcion', 'modulos', 'acciones'];
  dataSource = new MatTableDataSource<Rol>([]);
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  rolesData: Rol[] = [
    { id: 1, nombre: 'Administrador', descripcion: 'Acceso completo al sistema', modulos: ['Dashboard','Proyectos','Actividades','Seguimiento','Colaboradores','Clientes','Roles','Usuarios'] },
    { id: 2, nombre: 'Gerente', descripcion: 'Puede ver reportes y aprobar solicitudes', modulos: ['Proyectos','Actividades','Seguimiento','Clientes','Líderes'] },
    { id: 3, nombre: 'Líder', descripcion: 'Puede gestionar proyectos y actividades de su equipo', modulos: ['Proyectos','Actividades','Seguimiento','Colaboradores'] },
    { id: 4, nombre: 'Colaborador', descripcion: 'Puede registrar actividades y ver sus reportes', modulos: ['Actividades'] },
    { id: 5, nombre: 'Recursos Humanos', descripcion: 'Puede gestionar colaboradores y usuarios', modulos: ['Dashboard','Seguimiento','Colaboradores'] },
  ];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.dataSource.data = this.rolesData;
      this.loading = false;
    }, 500);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
        this.paginator.page.subscribe(() => {
          this.currentPage = this.paginator.pageIndex + 1;
        });
      }
    });
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  abrirDialog(rol?: Rol): void {
    const ref = this.dialog.open(RolDialogComponent, {
      width: '520px',
      data: rol ? { ...rol } : null,
    });
    ref.afterClosed().subscribe((result) => {
      if (result) {
        if (rol) {
          const idx = this.dataSource.data.findIndex(r => r.id === rol.id);
          if (idx > -1) {
            const updated = [...this.dataSource.data];
            updated[idx] = { ...rol, ...result };
            this.dataSource.data = updated;
          }
        } else {
          const nuevo: Rol = {
            id: this.dataSource.data.length + 1,
            ...result
          };
          this.dataSource.data = [...this.dataSource.data, nuevo];
        }
        this.snackBar.open(
          rol ? 'Rol actualizado' : 'Rol creado correctamente',
          'OK', { duration: 2500 }
        );
      }
    });
  }

  // ← MÉTODO ELIMINAR AGREGADO
  eliminar(rol: Rol): void {
    if (confirm(`¿Eliminar el rol "${rol.nombre}"?`)) {
      this.dataSource.data = this.dataSource.data.filter(r => r.id !== rol.id);
      this.snackBar.open('Rol eliminado', 'OK', { duration: 2500 });
    }
  }

  get totalRoles(): number { return this.dataSource.data.length; }

  getRolIcon(nombre: string): string {
    const icons: Record<string, string> = {
      'Administrador': 'admin_panel_settings',
      'Gerente': 'manage_accounts',
      'Líder': 'supervisor_account',
      'Colaborador': 'person',
      'Recursos Humanos': 'people',
      'Administrativo': 'business_center',
    };
    return icons[nombre] || 'shield';
  }

  chipColor(index: number): string {
    const colors = ['chip-blue','chip-green','chip-amber','chip-pink','chip-teal'];
    return colors[index % colors.length];
  }

  pageSize = 10;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.dataSource.filteredData.length / this.pageSize) || 1;
  }

  goFirst(): void { this.currentPage = 1; this.dataSource.paginator!.firstPage(); }
  goPrev(): void { if (this.currentPage > 1) { this.currentPage--; this.dataSource.paginator!.previousPage(); } }
  goNext(): void { if (this.currentPage < this.totalPages) { this.currentPage++; this.dataSource.paginator!.nextPage(); } }
  goLast(): void { this.currentPage = this.totalPages; this.dataSource.paginator!.lastPage(); }
}