import { EmployeeDto } from "./employeeDto";

export class WorkingDayDto{
    id!:number;
    date!:Date;
    totalStartCash!:number;
    totalWorkingDay!:number;
    totalCash!:number;
    totalWorkingDayWithDiscount!:number;
    totalDebit!:number;
    totalTransf!:number;
    totalCredit!:number;
    totalMP!:number;
    totalEmployeeSalary!:number;
    employees!:Array<EmployeeDto>
     dayStarted!:boolean;
}