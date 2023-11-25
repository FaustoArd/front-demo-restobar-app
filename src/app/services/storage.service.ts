import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  /**Jwt Token */
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

  /**RestoTable id */
  setTableIdForTableCreation(restoTableId:string){
    window.localStorage.setItem("restoTableId",restoTableId);
  }
  getTableIdForTableCreation(){
    return localStorage.getItem("restoTableId");
  }

  
    /**RestoTable id after table selection */
  setTableIdAfterTableSelection(tableOrderId:string){
    window.localStorage.setItem("tableOrderId",tableOrderId);
  }

  getTableIdAfterTableSelection(){
    return localStorage.getItem("tableOrderId")
  }

  /**Current user id */
  getCurrentUserId(){
    return localStorage.getItem("userId")
  }
  setCurrentUserId(userId:string){
    window.localStorage.setItem("userId",userId)
  }
   /**Current Working day */
  setCurrentWorkingDayId(workingDayId:string){
    window.localStorage.setItem("workingDayId",workingDayId);
  }
  getCurrentWorkingDayId(){
    return localStorage.getItem("workingDayId");
  }
  deleteCurrentWorkingDayId(){
    window.localStorage.removeItem("workingDayId");
  }

   /**Current Working day started boolean */
  setCurrentWorkingDayStatus(started:string){
    window.localStorage.setItem("started",started);
  }
  getCurrentWorkingDayStatus(){
    return localStorage.getItem("started");
  }
  deleteCurrentWorkingDayStatus(){
    window.localStorage.removeItem("started");
  }

   /**Current Selected product Id in the ingredient mix component */
  setCurrentSelectedProductId(productId_mix:string){
    window.localStorage.setItem("productId_mix",productId_mix);
  }
  getCurrentSelectedProductId(){
    return localStorage.getItem("productId_mix");
  }

  deleteCurrentSelectedProductId(){
    window.localStorage.removeItem("productId_mix");

  }
 /**Current Selected product status in the ingredient mix component */
  setCurrentSelectedProductStatus(product_mix_status:string){
    window.localStorage.setItem("product_mix_status",product_mix_status);
  }
  getCurrentSelectedProductStatus(){
    return localStorage.getItem("product_mix_status");
  }
  deleteCurrentSelectedProductStatus(){
    window.localStorage.removeItem("product_mix_status");
  }
  
}
