import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rol-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <mat-icon>shield</mat-icon>
        <h2>{{ esEdicion ? 'Editar Rol' : 'Nuevo Rol' }}</h2>
      </div>

      <mat-dialog-content>
        <form [formGroup]="form" class="dialog-form">

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Nombre del rol</mat-label>
            <input matInput formControlName="nombre" placeholder="Ej: Administrador" />
            <mat-error *ngIf="form.get('nombre')?.hasError('required')">Campo requerido</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Descripción</mat-label>
            <textarea matInput formControlName="descripcion" rows="3"
              placeholder="Describe las responsabilidades del rol"></textarea>
            <mat-error *ngIf="form.get('descripcion')?.hasError('required')">Campo requerido</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Módulos</mat-label>
            <mat-select formControlName="modulos" multiple>
              <mat-option *ngFor="let m of modulosDisponibles" [value]="m">{{ m }}</mat-option>
            </mat-select>
            <mat-error *ngIf="form.get('modulos')?.hasError('required')">Selecciona al menos un módulo</mat-error>
          </mat-form-field>

        </form>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="cancelar()">Cancelar</button>
        <button mat-flat-button color="primary" (click)="guardar()" [disabled]="form.invalid">
          {{ esEdicion ? 'Actualizar' : 'Guardar' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
 styles: [`
  .dialog-container { padding: 8px; }
  .dialog-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }
  .dialog-header mat-icon {
    color: #163572;
    font-size: 24px;
    width: 24px;
    height: 24px;
    line-height: 24px;
  }
  .dialog-header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #163572;
  }
  .dialog-form { display: flex; flex-direction: column; gap: 4px; }
  .full-width { width: 100%; }
`]
})
export class RolDialogComponent implements OnInit {
  form!: FormGroup;
  esEdicion = false;

  modulosDisponibles = [
    'Dashboard', 'Proyectos', 'Actividades', 'Seguimiento',
    'Colaboradores', 'Clientes', 'Líderes', 'Roles', 'Usuarios',
    'Días Festivos', 'Reportes', 'Requerimientos',
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.esEdicion = !!this.data?.id;
    this.form = this.fb.group({
      nombre:      [this.data?.nombre ?? '', Validators.required],
      descripcion: [this.data?.descripcion ?? '', Validators.required],
      modulos:     [this.data?.modulos ?? [], Validators.required],
    });
  }

  guardar(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}