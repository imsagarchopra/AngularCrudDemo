import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

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

  @Input() searchTerm!: string;
  @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete: boolean = false;
  
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _employeeService: EmployeeService) {

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

  viewEmployee(){
    this._router.navigate(['/employees', this.employee.id],{
      queryParams:{'searchTerm':this.searchTerm}
    });
  }

  editEmployee(){
    this._router.navigate(['/edit', this.employee.id]
    );
  }

  deleteEmployee(){
    
    this._employeeService.deleteEmployee(this.employee.id);
    this.notifyDelete.emit(this.employee.id);
  }
}
