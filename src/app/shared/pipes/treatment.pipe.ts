import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'treatment'
})
export class TreatmentPipe implements PipeTransform {

  transform(value: any[], arg: any): any {
    if(!arg)return value;
    const exist = value.filter(treatment => treatment.email.toLowerCase().toString().includes(arg.toLowerCase().toString(), -1));
    if(exist.length >= 1){
      return value.filter(treatment => treatment.email.toLowerCase().toString().includes(arg.toLowerCase().toString(), -1));
    }else{
      return value;
    }
  }

}
