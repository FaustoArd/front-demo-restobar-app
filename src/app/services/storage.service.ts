import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getAuthToken() {
    return localStorage.getItem("jwtToken");
  }

  setAuthToken(jwtToken: string) {
    if (jwtToken !== null) {
      window.localStorage.setItem("jwtToken", jwtToken);
    } else {
      window.localStorage.removeItem("jwtToken")
    }
  }

deleteToken() {
    window.localStorage.removeItem("jwtToken");
  }

  setTableIdForTableCreation(restoTableId:string){
    window.localStorage.setItem("restoTableId",restoTableId);
  }
  getTableIdForTableCreation(){
    return localStorage.getItem("restoTableId");
  }
  setTableIdAfterTableSelection(tableOrderId:string){
    window.localStorage.setItem("tableOrderId",tableOrderId);
  }

  getTableIdAfterTableSelection(){
    return localStorage.getItem("tableOrderId")
  }

  getCurrentUserId(){
    return localStorage.getItem("userId")
  }
  setCurrentUserId(userId:string){
    window.localStorage.setItem("userId",userId)
  }
  setCurrentWorkingDayId(workingDayId:string){
    window.localStorage.setItem("workingDayId",workingDayId);
  }
  getCurrentWorkingDayId(){
    return localStorage.getItem("workingDayId");
  }
  deleteCurrentWorkingDayId(){
    window.localStorage.removeItem("workingDayId");
  }

  setCurrentWorkingDayStatus(started:string){
    window.localStorage.setItem("started",started);
  }
  getCurrentWorkingDayStatus(){
    return localStorage.getItem("started");
  }
  deleteCurrentWorkingDayStatus(){
    window.localStorage.removeItem("started");
  }
  
}
