import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-usuario-dialog',
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
  templateUrl: './usuario-dialog.component.html',
  styleUrl: './usuario-dialog.component.scss'
})
export class UsuarioDialogComponent implements OnInit {
  form!: FormGroup;
  esEdicion = false;

  rolesDisponibles = [
    'Administrador', 'Gerente', 'Líder', 'Colaborador',
    'Recursos Humanos', 'Administrativo',
  ];

  estadosDisponibles = ['Activo', 'Inactivo'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.esEdicion = !!this.data?.id;
    this.form = this.fb.group({
      nombres:  [this.data?.nombres ?? '', Validators.required],
      usuario:  [this.data?.usuario ?? '', [Validators.required, Validators.email]],
      estado:   [this.data?.estado ?? 'Activo', Validators.required],
      roles:    [this.data?.roles ?? [], Validators.required],
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