import { Component, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Department } from '../models/department.model';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {Employee} from '../models/employee.model';
import {EmployeeService} from './employee.service'
import { Router} from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  @ViewChild('employeeForm')
  public createEmployeeForm !: NgForm;
  
  datePickerConfig!: Partial<BsDatepickerConfig>;

  employee: Employee = new Employee();

  departments: Department[] =[
    {id: 1, name: 'Help Desk'},
    {id: 2, name: 'HR'},
    {id: 3, name: 'IT'},
    {id: 4, name: 'Payroll'},
  ];
  photoPath!: string;
  previewPhoto: boolean = false;
  constructor(private _employeeService: EmployeeService,
    private _router: Router){
    this.datePickerConfig = Object.assign({},
       {
        containerClass: 'theme-dark-blue', 
        showWeekNumbers: false,
        minDate: new Date(2023,0,1),
        maxDate: new Date(2023,11,31),
        dateInputFormat: 'DD/MM/YYYY'
       });
  }
  // saveEmployee(empForm: NgForm): void{
  //   console.log(empForm.value);
  // }

  // saveEmployee(emp: Employee): void{
  //   console.log(emp);
  // }

  saveEmployee(): void{
    const newEmployee = Object.assign({},this.employee);
    this._employeeService.save(newEmployee);
    this.createEmployeeForm.reset();
    this._router.navigate(['list']);
  }

  togglePhotoPreview(): void{
    this.previewPhoto = !this.previewPhoto;
  }
}
