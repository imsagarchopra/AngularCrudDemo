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
  filteredEmployees!:Employee[];
  employeeToDisplay!: Employee;
  private arrayIndex = 1;
  private _searchTerm!:string;
  get searchTerm(): string{
    return this._searchTerm;
  }
  set searchTerm(value: string){
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  constructor(private _employeeService: EmployeeService,
    private _router: Router) { }

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    this.employeeToDisplay = this.employees[0];
    this.filteredEmployees = this.employees;
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

  filterEmployees(searchString: string):Employee[]{
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
}