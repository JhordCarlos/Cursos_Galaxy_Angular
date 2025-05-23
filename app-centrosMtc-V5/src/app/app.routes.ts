import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';
import { CentrosmedicosListComponent } from './components/centrosmedicos/centrosmedicos-list/centrosmedicos-list.component';
import { CentrosmedicosAddComponent } from './components/centrosmedicos/centrosmedicos-add/centrosmedicos-add.component';
import { LoginComponent } from './components/login/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { CentrosmedicosListPublicComponent } from './components/centrosmedicos/centrosmedicos-list-public/centrosmedicos-list-public.component';
import { DEFAULT_CURRENCY_CODE } from '@angular/core';
import { DepartamentoListComponent } from './components/departamentos/departamento-list/departamento-list.component';
import { ProvinciasListComponent } from './components/provincias/provincias-list/provincias-list.component';
import { DistritoListComponent } from './components/distrito/distrito-list/distrito-list.component';

export const routes: Routes = [
 
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'centromedico/add',
    component: CentrosmedicosAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'centromedico/add/:ruc',
    component: CentrosmedicosAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'centromedico/list-admin',
    component: CentrosmedicosListComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'centromedico/list',
    component: CentrosmedicosListPublicComponent,
  },

  {
    path:'departamentos/list',
    component: DepartamentoListComponent,
  },

  {
    path:'provincias/list',
    component: ProvinciasListComponent,
  },

  {
    path:'distritos/list',
    component: DistritoListComponent,
  },

  { path: '',
    redirectTo: 'centromedico/list',
    pathMatch: 'full'
  },

  {
    path:'**',
    component: PageNotFoundComponent
  }

];
