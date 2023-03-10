import { Injectable } from "@angular/core";
import { catchError, max, Observable, throwError } from "rxjs";
import { of } from 'rxjs';
import { Employee } from "../models/employee.model";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

@Injectable()
export class EmployeeService{

  constructor(private _httpClient: HttpClient){

  }

    private listEmployees: Employee[] = [
        {
          id: 1,
          name: 'Mark',
          gender: 'Male',
          contactPreference: 'Email',
          email: 'mark@pragimtech.com',
          dateOfBirth: new Date('10/25/1988'),
          department: '3',
          isActive: true,
          photoPath: 'assets/images/mark.png'
        },
        {
          id: 2,
          name: 'Mary',
          gender: 'Female',
          contactPreference: 'Phone',
          phoneNumber: 2345978640,
          dateOfBirth: new Date('11/20/1979'),
          department: '2',
          isActive: true,
          photoPath: 'assets/images/mary.png'
        },
        {
          id: 3,
          name: 'John',
          gender: 'Male',
          contactPreference: 'Phone',
          phoneNumber: 5432978640,
          dateOfBirth: new Date('3/25/1976'),
          department: '3',
          isActive: false,
          photoPath: 'assets/images/john.png'
        },
      ];

      getEmployees(): Observable<Employee[]>{
        //return of(this.listEmployees);

        return this._httpClient.get<Employee[]>('http://localhost:3000/employees').pipe(catchError(this.handleError));
      }

      handleError(errorResponse: HttpErrorResponse){
        if(errorResponse.error instanceof ErrorEvent){
          console.log('Client Side Error: ', errorResponse.error.message);
        }
        else{
          console.log('Server Side Error: ', errorResponse.error);
        }

        return throwError(() => new Error('There is some proble with the service. Please try again later.'));
      }

      getEmployee(id: number): any{
        return this.listEmployees.find(e => e.id === id); 
      }

      // save(employee: Employee): void{
      //   if(employee.id === null){
      //     const maxId = this.listEmployees.reduce(function(e1,e2){
      //       return (e1.id > e2.id) ? e1 : e2;
      //     }).id;

      //     employee.id = maxId + 1;
      //     this.listEmployees.push(employee);
      //   }
      //   else{
      //     const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
      //     this.listEmployees[foundIndex] = employee;
      //   }
      // }

      save(employee: Employee): Observable<Employee>{
       
          return this._httpClient.post<Employee>('http://localhost:3000/employees', employee,{
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          }).pipe(catchError(this.handleError));        
       
        }

      deleteEmployee(id: number){
        const foundIndex = this.listEmployees.findIndex(e => e.id === id);
        if(foundIndex != -1)
        {
          this.listEmployees.splice(foundIndex, 1);
        }
      }
}