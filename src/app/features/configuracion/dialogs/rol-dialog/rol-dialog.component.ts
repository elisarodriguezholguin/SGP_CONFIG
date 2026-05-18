import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

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
  ],
  templateUrl: './rol-dialog.component.html',
  styleUrl: './rol-dialog.component.scss'
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