import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/core/user/services/auth-guard.service';

import { ExamplesComponent } from './examples/examples.component';
import { ParentComponent } from './theming/parent/parent.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';
import { StockMarketContainerComponent } from './stock-market/components/stock-market-container.component';
import { CrudComponent } from './crud/components/crud.component';
import { FormComponent } from './form/components/form.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { Bed1ContainerComponent } from './bed1/bed1-container/bed1-container.component';
import { Bed2Component } from './bed2/bed2.component';
import { Bed3Component } from './bed3/bed3.component';
import { DistrictComponent } from './district/district.component';
import { Bed3ContainerComponent } from './bed3/bed3-container/bed3-container.component';



const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'authenticated',
        pathMatch: 'full'
      },
      {
        path: 'todos',
        component: TodosContainerComponent,
        data: { title: 'anms.examples.menu.todos' }
      },
      {
        path: 'bed1',
        component: Bed1ContainerComponent,
        data: { title: 'BED1' },
      },
      {
        path: 'bed2',
        component: Bed2Component,
        data: { title: 'BED2' },
      },
      {
        path: 'bed3',
        component: Bed3ContainerComponent,
        data: { title: 'BED3' },
      },
      {
        path: 'district',
        component: DistrictComponent,
        data: { title: 'DISTRICT' },
      },
      {
        path: 'stock-market',
        component: StockMarketContainerComponent,
        data: { title: 'anms.examples.menu.stocks' }
      },
      {
        path: 'theming',
        component: ParentComponent,
        data: { title: 'anms.examples.menu.theming' }
      },
      {
        path: 'crud',
        redirectTo: 'crud/',
        pathMatch: 'full'
      },
      {
        path: 'crud/:id',
        component: CrudComponent,
        data: { title: 'anms.examples.menu.crud' }
      },
      {
        path: 'form',
        component: FormComponent,
        data: { title: 'anms.examples.menu.form' }
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        data: { title: 'anms.examples.menu.notifications' }
      },
      {
        path: 'authenticated',
        component: AuthenticatedComponent,
        data: { title: 'anms.examples.menu.auth' },
        canActivate: [AuthGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule {}
