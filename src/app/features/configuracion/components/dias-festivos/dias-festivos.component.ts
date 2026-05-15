import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeriadoDialogComponent } from '../../dialogs/feriado-dialog/feriado-dialog.component';

export interface Feriado {
  id: number;
  nombre: string;
  fecha: string;
  tipo: 'NACIONAL' | 'RELIGIOSO' | 'LOCAL' | string;
}

export interface CeldaCalendario {
  dia: number;
  mes: number;
  anio: number;
  esEsteMes: boolean;
  esHoy: boolean;
  feriados: Feriado[];
}

@Component({
  selector: 'app-dias-festivos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  templateUrl: './dias-festivos.component.html',
  styleUrls: ['./dias-festivos.component.scss'],
})
export class DiasFestivosComponent implements OnInit {
  anio = new Date().getFullYear();
  mesActual = new Date().getMonth();

  meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
           'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  diasSemana = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

  feriados: Feriado[] = [
    { id: 1,  nombre: 'Año Nuevo',               fecha: '2025-01-01', tipo: 'NACIONAL'  },
    { id: 2,  nombre: 'Carnaval (Día 1)',         fecha: '2025-03-03', tipo: 'NACIONAL'  },
    { id: 3,  nombre: 'Carnaval (Día 2)',         fecha: '2025-03-04', tipo: 'NACIONAL'  },
    { id: 4,  nombre: 'Viernes Santo',            fecha: '2025-04-18', tipo: 'RELIGIOSO' },
    { id: 5,  nombre: 'Batalla de Pichincha',     fecha: '2025-05-24', tipo: 'NACIONAL'  },
    { id: 6,  nombre: 'Independencia',            fecha: '2025-08-10', tipo: 'NACIONAL'  },
    { id: 7,  nombre: 'Independencia Guayaquil',  fecha: '2025-10-09', tipo: 'LOCAL'     },
    { id: 8,  nombre: 'Día de Difuntos',          fecha: '2025-11-02', tipo: 'NACIONAL'  },
    { id: 9,  nombre: 'Fundación de Quito',       fecha: '2025-12-06', tipo: 'LOCAL'     },
    { id: 10, nombre: 'Navidad',                  fecha: '2025-12-25', tipo: 'RELIGIOSO' },
    { id: 11, nombre: 'Año Nuevo',                fecha: '2026-01-01', tipo: 'NACIONAL'  },
    { id: 12, nombre: 'Carnaval (Día 1)',          fecha: '2026-02-16', tipo: 'NACIONAL'  },
    { id: 13, nombre: 'Carnaval (Día 2)',          fecha: '2026-02-17', tipo: 'NACIONAL'  },
    { id: 14, nombre: 'Viernes Santo',             fecha: '2026-04-03', tipo: 'RELIGIOSO' },
    { id: 15, nombre: 'Batalla de Pichincha',      fecha: '2026-05-24', tipo: 'NACIONAL'  },
    { id: 16, nombre: 'Independencia',             fecha: '2026-08-10', tipo: 'NACIONAL'  },
    { id: 17, nombre: 'Independencia Guayaquil',   fecha: '2026-10-09', tipo: 'LOCAL'     },
    { id: 18, nombre: 'Día de Difuntos',           fecha: '2026-11-02', tipo: 'NACIONAL'  },
    { id: 19, nombre: 'Navidad',                   fecha: '2026-12-25', tipo: 'RELIGIOSO' },
  ];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  get feriadosFiltrados(): Feriado[] {
    return this.feriados.filter(f => f.fecha.startsWith(String(this.anio)));
  }

  contarTipo(tipo: string): number {
    return this.feriadosFiltrados.filter(f => f.tipo === tipo).length;
  }

  get celdasCalendario(): CeldaCalendario[] {
    const hoy = new Date();
    const primerDia = new Date(this.anio, this.mesActual, 1).getDay();
    const totalDias = new Date(this.anio, this.mesActual + 1, 0).getDate();
    const diasMesAnterior = new Date(this.anio, this.mesActual, 0).getDate();

    const celdas: CeldaCalendario[] = [];

    // Días mes anterior
    for (let i = primerDia - 1; i >= 0; i--) {
      const dia = diasMesAnterior - i;
      const mes = this.mesActual - 1;
      const anioReal = mes < 0 ? this.anio - 1 : this.anio;
      const mesReal = mes < 0 ? 11 : mes;
      celdas.push({ dia, mes: mesReal, anio: anioReal, esEsteMes: false, esHoy: false, feriados: [] });
    }

    // Días del mes actual
    for (let d = 1; d <= totalDias; d++) {
      const fecha = `${this.anio}-${String(this.mesActual + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const feriadosDia = this.feriados.filter(f => f.fecha === fecha);
      const esHoy = hoy.getFullYear() === this.anio &&
                    hoy.getMonth() === this.mesActual &&
                    hoy.getDate() === d;
      celdas.push({ dia: d, mes: this.mesActual, anio: this.anio, esEsteMes: true, esHoy, feriados: feriadosDia });
    }

    // Completar hasta 42 celdas
    const restantes = 42 - celdas.length;
    for (let d = 1; d <= restantes; d++) {
      const mes = this.mesActual + 1;
      const anioReal = mes > 11 ? this.anio + 1 : this.anio;
      const mesReal = mes > 11 ? 0 : mes;
      celdas.push({ dia: d, mes: mesReal, anio: anioReal, esEsteMes: false, esHoy: false, feriados: [] });
    }

    return celdas;
  }

  cambiarMes(delta: number): void {
    this.mesActual += delta;
    if (this.mesActual > 11) { this.mesActual = 0; this.anio++; }
    if (this.mesActual < 0)  { this.mesActual = 11; this.anio--; }
  }

  irHoy(): void {
    const hoy = new Date();
    this.anio = hoy.getFullYear();
    this.mesActual = hoy.getMonth();
  }

  abrirDialog(feriado?: Feriado): void {
    const ref = this.dialog.open(FeriadoDialogComponent, {
      width: '480px',
      data: feriado ? { ...feriado } : null,
    });
    ref.afterClosed().subscribe(result => {
      if (result) this.snackBar.open('Feriado guardado', 'OK', { duration: 2500 });
    });
  }

  eliminarFeriado(id: number): void {
    this.feriados = this.feriados.filter(f => f.id !== id);
    this.snackBar.open('Feriado eliminado', 'OK', { duration: 2000 });
  }
}