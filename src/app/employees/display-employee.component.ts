import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {
  private _employee!: Employee;
  selectedEmployeeId!: Number;
  @Input()
  set employee(val: Employee) {
    console.log('Previous : ' + (this._employee ? this._employee.name : 'NULL'));
    console.log('Current : ' + val.name);
    this._employee = val;
  }
  get employee(): Employee {
    return this._employee;
  }

  @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();
  constructor(private _route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.selectedEmployeeId = Number(this._route.snapshot.paramMap.get('id'));
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   const previousEmployee = <Employee>changes.employee.previousValue;
  //   const currentEmployee = <Employee>changes.employee.currentValue;

  //   console.log('Previous : ' + (previousEmployee ? previousEmployee.name : 'NULL'));
  //   console.log('Current : ' + currentEmployee.name);
  // }

  handleClick():void{
    this.notify.emit(this.employee);
  }
}
