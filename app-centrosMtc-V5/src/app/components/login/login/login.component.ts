import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  
  frmLogin!: FormGroup;
  private router = inject(Router);
  private authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  toastr = inject(ToastrService);
  
  ngOnInit(): void {
    this.createFormLogin();
  }

  login() {
    if (this.frmLogin.invalid) return;

    const { username, password } = this.frmLogin.value;
    this.authService.login(username.toUpperCase(), password).subscribe({
      next: () => {
        this.router.navigate(['/centromedico/list-admin']); 
      },
      error: () => this.toastr.error('Error en la autenticación')
    });
  }

  createFormLogin() {
    this.frmLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  home(){
    this.router.navigate(['']); 
  }
}
