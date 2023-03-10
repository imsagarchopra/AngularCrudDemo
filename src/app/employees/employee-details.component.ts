import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  private _id!: number;
  employee!: Employee;

  constructor(private _route: ActivatedRoute,
    private _employeeService: EmployeeService,
    private _router: Router) { }

  ngOnInit(): void {
    //this._id =  +this._route.snapshot.params["id"];
    //const id =  this._route.snapshot.paramMap.get('this._id');

    this._route.paramMap.subscribe(params => {
      this._id = Number(params.get('id'));
      this.employee = this._employeeService.getEmployee(this._id);
    });
  }

  viewNextEmployee(): void {

    if(this._id < 3)
    {
      this._id = this._id + 1;
    }
    else{
      this._id = 1;
    }
    this._router.navigate(['/employees', this._id],{
      queryParamsHandling:'preserve'
    });
  }
}
