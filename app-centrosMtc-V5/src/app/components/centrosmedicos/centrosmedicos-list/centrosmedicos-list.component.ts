import { CentromedicoService } from './../../../services/centromedico.service';
import { ProvinciaService } from './../../../services/provincia.service';
import { Provincia } from './../../../interface/provincia/provincia';
import { DepartamentoService } from './../../../services/departamento.service';
import { Departamento } from './../../../interface/departamento/departamento';
import { Component, inject, OnInit } from '@angular/core';
import { Distrito } from '../../../interface/distrito/distrito';
import { DistritoService } from '../../../services/distrito.service';
import { CentroMedico } from '../../../interface/centros/centromedico';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpStatusCode } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { AuthService } from '../../../services/auth.service';
import { PipeAutorizacionPipe } from '../../../pipes/pipe-autorizacion.pipe';

@Component({
  selector: 'app-centrosmedicos-list',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    PaginationModule,
    PipeAutorizacionPipe
  ],
  templateUrl: './centrosmedicos-list.component.html',
  styleUrl: './centrosmedicos-list.component.css',
})
export class CentrosmedicosListComponent implements OnInit {
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  centrosMedicos: CentroMedico[] = [];

  departamentoService = inject(DepartamentoService);
  provinciaService = inject(ProvinciaService);
  distritoService = inject(DistritoService);
  centromedicoService = inject(CentromedicoService);
  formBuilder = inject(FormBuilder);
  router=inject(Router);
  private authService = inject(AuthService);
  toastr = inject(ToastrService);

  pagedItems:CentroMedico[]=[];
  itemsPerPage:number=8;
  currentPage:number=1;

  formBuscar! : FormGroup;

  ngOnInit(): void {
    this.createFormBuscar();
    this.getAllDepartamento();
  }

  createFormBuscar(){
    this.formBuscar = this.formBuilder.group(
      {
        departamento:['0'],
        provincia: ['0'],
        distrito: ['0']
      }
    )
  }

  getAllDepartamento() {
    this.departamentoService.getAll().subscribe({
      next: (response) => {
        this.departamentos = response;
      },
      error: (error) => {
        this.toastr.error("Error al cargar departamentos")
      },
    });
  }

  getProvinciaByDepartamento(departamentoId: string) {
    this.provinciaService.getByDepartamento(departamentoId).subscribe({
      next: (response) => {
        this.provincias = response;
      },
      error: (error) => {
        this.toastr.error("Error al cargar las provincias")
      },
    });
  }

  getDistritoByProvincia(provinciaId: string) {
    this.distritoService.getByProvincia(provinciaId).subscribe({
      next: (response) => {
        this.distritos = response;
      },
      error: (error) => {
        this.toastr.error("Error al cargar los distritos")
      },
    });
  }

  getAll() {
    this.centromedicoService.getAll().subscribe({
      next: (response) => {
        this.centrosMedicos = response;
        this.pagedItems = this.centrosMedicos.slice(0, this.itemsPerPage);
      },
      error: (error) => {
        this.toastr.error("Error al cargar los centros médicos")
      },
    });
  }

  getCentroMedicosByUbigeo(
    departamentoId: string,
    provinciaId: string,
    distritoId: string
  ) {
    this.centromedicoService
      .getByUbigeo(departamentoId, provinciaId, distritoId)
      .subscribe({
        next: (response) => {
          this.centrosMedicos = response;
          this.pagedItems = this.centrosMedicos.slice(0, this.itemsPerPage);
        },
        error: (error) => {
          this.toastr.error("Error al cargar los centros médicos")
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

  onProvinciaChange($event: any) {
    const provinciaId = $event.target.value;
    this.distritos = [];
    if (provinciaId == '0') {
      this.distritos = [];
      
    }
    this.formBuscar.controls['distrito'].setValue('0');
    this.getDistritoByProvincia(provinciaId);
  }

  buscar() {
    let departamentoId = this.formBuscar.value.departamento ?? '0';
    let provinciaId = this.formBuscar.value.provincia ?? '0';
    let distritoId = this.formBuscar.value.distrito ?? '0';
    if (departamentoId != '0')
      this.getCentroMedicosByUbigeo(departamentoId, provinciaId, distritoId);
    else this.getAll();
  }

  limpiar() {
    this.provincias = [];
    this.distritos = [];
    this.formBuscar.controls['departamento'].setValue('0');
    this.formBuscar.controls['provincia'].setValue('0');
    this.formBuscar.controls['distrito'].setValue('0');
    this.centrosMedicos = [];
    this.pagedItems = [];
  }

  agregar(){
     this.router.navigate(['centromedico/add']);
  }

  modificar(centroMedico : CentroMedico){
    this.router.navigate(['centromedico/add', centroMedico.ruc]);
  }

  eliminar(centroMedico : CentroMedico){

    Swal.fire({
      title: "Alerta",
      text: "Confirma la eliminacion del registro con nombre: "+centroMedico.nombre,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.centromedicoService.delete(centroMedico.ruc).subscribe(
          {
            next: (response) => {
              if(response.status === HttpStatusCode.Ok){
                this.toastr.success('El Centro médico '+centroMedico.nombre +', fue eliminado con exito','Aviso');
                this.createFormBuscar();
                this.centrosMedicos = [];
              }else{
                this.toastr.warning('Error al eliminar el centro médico seleccionado','Error');
              }
            },
            error: (error) => {
              this.toastr.error('Error al eliminar centro médico','Error');
            }
          }
        )

      }
    });

  }

    pageChanged(event: PageChangedEvent): void {
      const startItem = (event.page - 1) * this.itemsPerPage; //0
      const endItem = event.page * this.itemsPerPage; //10
      this.pagedItems = this.centrosMedicos.slice(startItem, endItem);
    }

}
