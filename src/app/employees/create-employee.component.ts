import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Department } from '../models/department.model';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {Employee} from '../models/employee.model';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {

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
  constructor(){
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

  saveEmployee(emp: Employee): void{
    console.log(emp);
  }

  togglePhotoPreview(): void{
    this.previewPhoto = !this.previewPhoto;
  }
}
