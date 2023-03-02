import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Department } from '../models/department.model';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {Employee} from '../models/employee.model';
import {EmployeeService} from './employee.service'
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit{
  @ViewChild('employeeForm')
  public createEmployeeForm !: NgForm;
  
  datePickerConfig!: Partial<BsDatepickerConfig>;

  employee: Employee = new Employee();
  panelTitle!: string;

  departments: Department[] =[
    {id: 1, name: 'Help Desk'},
    {id: 2, name: 'HR'},
    {id: 3, name: 'IT'},
    {id: 4, name: 'Payroll'},
  ];
  photoPath!: string;
  previewPhoto: boolean = false;
  constructor(private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute){
    this.datePickerConfig = Object.assign({},
       {
        containerClass: 'theme-dark-blue', 
        showWeekNumbers: false,
        minDate: new Date(2023,0,1),
        maxDate: new Date(2023,11,31),
        dateInputFormat: 'DD/MM/YYYY'
       });
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(parameterMap =>{
      const id = Number(parameterMap.get('id'));
      this.getEmployee(id);
    });
  }

  getEmployee(id: number): void{
    if(id == 0){
      this.employee = new Employee();
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm.reset();
    }
    else{
      this.panelTitle = 'Edit Employee';
      this.employee = Object.assign({},this._employeeService.getEmployee(id));
    }
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
