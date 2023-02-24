import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {
  private _employee!: Employee;
  @Input()
  set employee(val: Employee){
    console.log('Previous : ' + (this._employee ? this._employee.name : 'NULL'));
    console.log('Current : ' + val.name);
    this._employee = val;
  }
  get employee(): Employee{
    return this._employee;
  }
  constructor(){

  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   const previousEmployee = <Employee>changes.employee.previousValue;
  //   const currentEmployee = <Employee>changes.employee.currentValue;

  //   console.log('Previous : ' + (previousEmployee ? previousEmployee.name : 'NULL'));
  //   console.log('Current : ' + currentEmployee.name);
  // }
}
