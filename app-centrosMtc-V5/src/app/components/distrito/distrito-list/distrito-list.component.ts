import { Component, inject, OnInit } from '@angular/core';
import { DistritoService } from '../../../services/distrito.service';
import { Distrito } from '../../../interface/distrito/distrito';
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
import { Provincia } from '../../../interface/provincia/provincia';
import { DepartamentoService } from '../../../services/departamento.service';
import { ProvinciaService } from '../../../services/provincia.service';

@Component({
  selector: 'app-distrito-list',
  imports: [CommonModule, PaginationModule, FormsModule, ReactiveFormsModule],
  templateUrl: './distrito-list.component.html',
  styleUrl: './distrito-list.component.css',
})
export class DistritoListComponent implements OnInit {
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  distritoService = inject(DistritoService);
  toastr = inject(ToastrService);
  formBuilder = inject(FormBuilder);
  departamentoService = inject(DepartamentoService);
  provinciaService = inject(ProvinciaService);

  pagedItems: Distrito[] = [];
  itemsPerPage: number = 20;
  currentPage: number = 1;

  formBuscar!: FormGroup;

  ngOnInit(): void {
    this.createFormBuscar();
    this.getAllDepartamento();
  }

  
  createFormBuscar(){
    this.formBuscar = this.formBuilder.group(
      {
        departamento:['0'],
        provincia: ['0'],
      }
    )
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
      },
      error: (error) => {
        this.toastr.error('Error al cargar provincias por departamento');
      },
    });
  }

   getDistritoByProvincia(provinciaId: string) {
    this.distritoService.getByProvincia(provinciaId).subscribe({
      next: (response) => {
        this.distritos = response;
        this.pagedItems = this.distritos.slice(0, this.itemsPerPage);
      },
      error: (error) => {
        this.toastr.error("Error al cargar distritos por provincia");
      },
    });
  }

   onDepartamentoChange($event: any) {
    const departamentoId = $event.target.value;
    this.provincias = [];
    if (departamentoId == '0') {
      this.provincias = [];
      this.distritos = [];
    }
    this.formBuscar.controls['provincia'].setValue('0');
    this.getProvinciaByDepartamento(departamentoId);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * this.itemsPerPage; //0
    const endItem = event.page * this.itemsPerPage; //10
    this.pagedItems = this.distritos.slice(startItem, endItem);
  }
  
  buscar() {
    let departamentoId = this.formBuscar.value.departamento ?? '0';
    let provinciaId = this.formBuscar.value.provincia ?? '0';
    if (provinciaId != '0')
      this.getDistritoByProvincia(provinciaId);
  }


  limpiar() {
    this.provincias = [];
    this.formBuscar.controls['departamento'].setValue('0');
    this.formBuscar.controls['provincia'].setValue('0');
    this.distritos = [];
    this.pagedItems = [];
  }

}
