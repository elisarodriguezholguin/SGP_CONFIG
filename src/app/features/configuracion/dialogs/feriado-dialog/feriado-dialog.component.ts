import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-feriado-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './feriado-dialog.component.html',
  styleUrls: ['./feriado-dialog.component.scss'],
})
export class FeriadoDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<FeriadoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      fecha:  [data?.fecha  || '', Validators.required],
      tipo:   [data?.tipo   || 'NACIONAL', Validators.required],
    });
  }

  guardar(): void {
    if (this.form.valid) this.ref.close(this.form.value);
  }
}