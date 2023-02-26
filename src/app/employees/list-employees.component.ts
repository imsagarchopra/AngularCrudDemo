import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  // selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit{
  employees!: Employee[];
  employeeToDisplay!: Employee;
  private arrayIndex = 1;
  searchTerm!:string;

  constructor(private _employeeService: EmployeeService,
    private _router: Router) { }

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    this.employeeToDisplay = this.employees[0];
  }

  nextEmployee():void{
    if(this.arrayIndex <= 2)
    {
      this.employeeToDisplay = this.employees[this.arrayIndex];
      this.arrayIndex++;
    }
    else{
      this.employeeToDisplay = this.employees[0];
      this.arrayIndex = 1;
    }
  }

  dataFromChild!: Employee;
  handleNotify(eventData: Employee):void{
    this.dataFromChild = eventData;
  }

  onClick(employeeId: number): void{
    this._router.navigate(['/employees', employeeId])
  }
}