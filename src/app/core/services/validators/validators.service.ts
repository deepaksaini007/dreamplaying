import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  

  isDateLessThanExpiring(numberOfDays:number,date:Date){
    const dateToCheck  = new Date(date)
    const currentDate = new Date();
    const futureDate = new Date(currentDate.setDate(currentDate.getDate()+numberOfDays));
    return dateToCheck>=new Date() &&  dateToCheck<=futureDate;
  }

  getLessthanTodayDate(){
    return new Date();
  }

  isDateLessThanToday(numberOfDays:number,date:Date){
    const dateToCheck  = new Date(date)
    const currentDate = new Date();
    return dateToCheck<currentDate;
  }

  getStartDateForExpiry(){
    return new Date();
  }
  getStartDateForExpiryWithDays(days:number){
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay  = new Date().getDate()
    return new Date(currentYear,currentMonth,currentDay+days)
  }

  getStartDateForExpiryWithDaysPrevious(days:number){
    const currentDate=  new Date();
    const prevDate = new Date(currentDate.setDate(currentDate.getDate()-days));
    return prevDate;
  }
  getStartDateForHiring(minCondition:number = 5){
    const currentYear = new Date().getFullYear();
    return new Date(currentYear-minCondition,0,1);
  }
  getEndDateForHiring(){
    return new Date();
  }
  getEndDateForExpiry(minGap:number=3){
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay  = new Date().getDate()
    return new Date(currentYear+minGap,currentMonth,currentDay);
  }

  getStartForLeaving(){
    const currentYear = new Date().getFullYear();
    return new Date(currentYear-10,0,1)

  }
  getEndForLeaving(){
    const currentYear = new Date().getFullYear();
    return new Date(currentYear+1,0,1)
  }
  getEndDateForDateOfBirth(minAge:number=18){
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay  = new Date().getDate()
    return new Date(currentYear-minAge,currentMonth,currentDay);
  }

 hasRequiredField(abstractControl: AbstractControl|null|undefined): boolean  {
   if(!abstractControl){
     return false;
   }
    if (abstractControl.validator) {
        const validator = abstractControl.validator({}as AbstractControl);
        if (validator && validator.required) {
            return true;
        }

    }
    if ((abstractControl as FormGroup).controls) {

        for (const controlName in (abstractControl as FormGroup).controls) {
            if ((abstractControl as FormGroup).controls[controlName]) {
                if (this.hasRequiredField((abstractControl as FormGroup).controls[controlName])) {
                    return true;
                }
            }
        }
    }
    return false;
};
}
