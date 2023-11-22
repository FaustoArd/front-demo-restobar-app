import { EmployeeDto } from "./employeeDto";

export class WorkingDayDto{
    id!:number;
    totalStartCash!:number;
    totalWorkingDay!:number;
    totalPostEmployeeSalary!:number;
    totalCash!:number;
    totalDebit!:number;
    totalTransf!:number;
    cashierName!:string;
    employees!:Array<EmployeeDto>;
    totalWaitressSalary!:number;
    totalCashierSalary!:number;
    dayStarted!:boolean;
}