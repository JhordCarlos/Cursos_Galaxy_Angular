import { Component, inject, OnInit } from '@angular/core';
import { Departamento } from '../../../interface/departamento/departamento';
import { DepartamentoService } from '../../../services/departamento.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-departamento-list',
  imports: [
    CommonModule
  ],
  templateUrl: './departamento-list.component.html',
  styleUrl: './departamento-list.component.css'
})
export class DepartamentoListComponent implements OnInit{
  departamentos: Departamento[] = [];
  
  departamentoService = inject(DepartamentoService);
  toastr = inject(ToastrService);
  
  ngOnInit(): void {
     this.getAllDepartamento();
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
}
