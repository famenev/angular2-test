import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseComponent }      from './choose.component';
import { CreateComponent }      from './create.component';

const appRoutes: Routes = [
{
  path: '',
  redirectTo: 'choose',
  pathMatch: 'full'
},
  {
    path: 'choose',
    component: ChooseComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
