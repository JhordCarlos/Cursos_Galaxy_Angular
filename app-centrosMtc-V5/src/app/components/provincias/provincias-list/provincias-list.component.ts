import { Component, inject, OnInit } from '@angular/core';
import { Provincia } from '../../../interface/provincia/provincia';
import { ProvinciaService } from '../../../services/provincia.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Departamento } from '../../../interface/departamento/departamento';
import { DistritoService } from '../../../services/distrito.service';
import { DepartamentoService } from '../../../services/departamento.service';

@Component({
  selector: 'app-provincias-list',
  imports: [CommonModule, PaginationModule, FormsModule, ReactiveFormsModule],
  templateUrl: './provincias-list.component.html',
  styleUrl: './provincias-list.component.css',
})
export class ProvinciasListComponent implements OnInit {
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  departamentoService = inject(DepartamentoService);
  provinciaService = inject(ProvinciaService);
  toastr = inject(ToastrService);
  formBuilder = inject(FormBuilder);

  pagedItems: Provincia[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;

  formBuscar!: FormGroup;

  ngOnInit(): void {
    this.createFormBuscar();
    this.getAllDepartamento();
  }

  createFormBuscar() {
    this.formBuscar = this.formBuilder.group({
      departamento: ['0'],
    });
  }

  getAllDepartamento() {
    this.departamentoService.getAll().subscribe({
      next: (response) => {
        this.departamentos = response;
      },
      error: (error) => {
        this.toastr.error('Error al cargar departamentos');
      },
    });
  }
  getProvinciaByDepartamento(departamentoId: string) {
    this.provinciaService.getByDepartamento(departamentoId).subscribe({
      next: (response) => {
        this.provincias = response;
        this.pagedItems = this.provincias.slice(0, this.itemsPerPage);
      },
      error: (error) => {
        this.toastr.error('Error al cargar provincias por departamento');
      },
    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * this.itemsPerPage; //0
    const endItem = event.page * this.itemsPerPage; //10
    this.pagedItems = this.provincias.slice(startItem, endItem);
  }

  buscar() {
    let departamentoId = this.formBuscar.value.departamento ?? '0';
    if (departamentoId != '0') this.getProvinciaByDepartamento(departamentoId);
  }

  limpiar() {
    this.provincias = [];
    this.formBuscar.controls['departamento'].setValue('0');
    this.pagedItems = [];
  }
}
