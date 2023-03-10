import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator-directive';
import { confirmEqualValidatorDirective} from './shared/confirm-equal-validator.directive';
import {EmployeeService} from './employees/employee.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { EmployeeListResolverGuardService } from './employees/employee-list-resolver-guard.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-can-activate-guard.service';
import { AccordionComponent } from './shared/accordion.component';

const appRoutes: Routes = [
  {
     path: 'list',
     component:ListEmployeesComponent,
     resolve:{employeeList : EmployeeListResolverGuardService}
  },
  {
     path: 'edit/:id',
     component:CreateEmployeeComponent,
     canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
  { path: 'employees/:id', component:EmployeeDetailsComponent, canActivate:[EmployeeDetailsGuardService] },
  { path: '', redirectTo:'/list', pathMatch: 'full' },
  { path: 'notfound', component:PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    confirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [EmployeeService,CreateEmployeeCanDeactivateGuardService, EmployeeListResolverGuardService,EmployeeDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
