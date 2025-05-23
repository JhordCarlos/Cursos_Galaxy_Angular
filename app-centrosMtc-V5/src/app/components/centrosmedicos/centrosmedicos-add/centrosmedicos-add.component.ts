import { Centromedicorequest } from './../../../interface/centros/centromedicorequest';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CentromedicoService } from '../../../services/centromedico.service';
import { Departamento } from '../../../interface/departamento/departamento';
import { Provincia } from '../../../interface/provincia/provincia';
import { Distrito } from '../../../interface/distrito/distrito';
import { DepartamentoService } from '../../../services/departamento.service';
import { ProvinciaService } from '../../../services/provincia.service';
import { DistritoService } from '../../../services/distrito.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-centrosmedicos-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './centrosmedicos-add.component.html',
  styleUrl: './centrosmedicos-add.component.css',
})
export class CentrosmedicosAddComponent implements OnInit {
  centroMedicoRequest?: Centromedicorequest;
  frmCentroMedico!: FormGroup;

  ruc: string = '';
  titulo?: string;
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  
  departamentoService = inject(DepartamentoService);
  provinciaService = inject(ProvinciaService);
  distritoService = inject(DistritoService);

  centroMedicoService = inject(CentromedicoService);
  formBuilder = inject(FormBuilder);
  toastr = inject(ToastrService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.titulo = 'Registro Centros Médicos';
    this.createFormCentroMedico();
    this.getAllDepartamento();

    this.activatedRoute.params.subscribe((p) => {
      if (p['ruc']) {
        this.ruc = p['ruc'];
        this.findByruc(this.ruc);
      }
    });
  }

  createFormCentroMedico() {
    this.frmCentroMedico = this.formBuilder.group({
      ruc: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      nombre: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(200),]],
      direccion: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(300),]],
      departamentoId: ['0',Validators.required],
      provinciaId: ['0', Validators.required],
      distritoId: ['0',Validators.required],
      autorizacion: [true],
    });
  }

  findByruc(ruc: string) {
    this.centroMedicoService.getByRuc(ruc).subscribe({
      next: (response) => {
        this.frmCentroMedico.patchValue(response);
        this.fcm['autorizacion'].setValue(response.autorizacionId == 1);
        this.getProvinciaByDepartamento(this.fcm['departamentoId'].value);
        this.getDistritoByProvincia(this.fcm['provinciaId'].value);
      },
      error: (error) => {
        this.toastr.error('Error al buscar centro médico con ruc ' + ruc);
      },
    });
  }

  getAllDepartamento() {
    this.departamentoService.getAll().subscribe({
      next: (response) => {
        this.departamentos = response;
      },
      error: (error) => {
        this.toastr.error('error al cargar departamentos');
      },
    });
  }

  getProvinciaByDepartamento(departamentoId: string) {
    this.provinciaService.getByDepartamento(departamentoId).subscribe({
      next: (response) => {
        this.provincias = response;
      },
      error: (error) => {
        this.toastr.error('error al cargar provincias');
      },
    });
  }

  getDistritoByProvincia(provinciaId: string) {
    this.distritoService.getByProvincia(provinciaId).subscribe({
      next: (response) => {
        this.distritos = response;
      },
      error: (error) => {
        this.toastr.error('error al cargar distritos');
      },
    });
  }

  onSubmit() {
    if (this.frmCentroMedico.invalid) {
      return;
    }
    const _ruc = this.fcm['ruc'].value;
    const _nombre = this.fcm['nombre'].value;
    const _direccion = this.fcm['direccion'].value;
    const _departamentoId = this.fcm['departamentoId'].value;
    const _provinciaId = this.fcm['provinciaId'].value;
    const _distritoId = this.fcm['distritoId'].value;
    let _autorizacion = 1;
    if (!this.fcm['autorizacion'].value) {
      _autorizacion = 0;
    }

    const centromedico: Centromedicorequest = {
      ruc: _ruc,
      nombre: _nombre,
      direccion: _direccion,
      departamentoId: _departamentoId,
      provinciaId: _provinciaId,
      distritoId: _distritoId,
      autorizacion: _autorizacion,
    };

    Swal.fire({
      title: 'Alerta',
      text: '¿Está seguro de grabar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.ruc != '') this.update(centromedico);
        else this.add(centromedico);
      }
    });
  }

  cancelar() {
    this.salir();
  }

  salir() {
    this.router.navigate(['centromedico/list-admin']);
  }
  onDepartamentoChange($event: any) {
    const _departamentoId = $event.target.value;
    this.provincias = [];
    if (_departamentoId == '0') {
      this.provincias = [];
      this.distritos = [];
      this.fcm['provinciaId'].setValue('0');
    }
    this.getProvinciaByDepartamento(_departamentoId);
  }

  onProvinciaChange($event: any) {
    const provinciaId = $event.target.value;
    this.distritos = [];
    if (provinciaId == '0') {
      this.distritos = [];
      this.fcm['distritoId'].setValue('0');
    }

    this.getDistritoByProvincia(provinciaId);
  }

  // Alias del formulario
  get fcm(): { [key: string]: AbstractControl } {
    return this.frmCentroMedico.controls;
  }

  add(centromedReq: Centromedicorequest) {
    this.centroMedicoService.add(centromedReq).subscribe({
      next: (response) => {
        if (response.status === HttpStatusCode.Created) {
          this.toastr.success(
            'Centro Médico con RUC = ' +
              centromedReq.ruc +
              ' registrado correctamente',
            'Aviso'
          );
          this.salir();
        }
      },
      error: (error) => {
        const errorMessages = Object.values(error.error).join('\n');
        this.toastr.error(errorMessages, 'Error');
      },
    });
  }

  update(centromedicoreq: Centromedicorequest) {
    this.centroMedicoService.update(this.ruc, centromedicoreq).subscribe({
      next: (response) => {
        if (response.status === HttpStatusCode.Ok)
          this.toastr.success(
            'Centro médico actualizado con exito, ruc=' + this.ruc,
            'Aviso'
          );
        this.cancelar();
      },
      error: (error) => {
        this.toastr.error('Error al actualizar Centro médico', 'Error');
      },
    });
  }

 validarSeleccion(control: AbstractControl): ValidationErrors | null {
  return control.value === 0 ? { seleccionInvalida: true } : null;
}
}
