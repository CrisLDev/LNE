import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'patients'
})
export class PatientsPipe implements PipeTransform {

  transform(value: any[], arg: any): any {
    if(!arg)return value;
    const exist = value.filter(patient => patient.name.toLowerCase().toString().includes(arg.toLowerCase().toString(), -1));
    if(exist.length >= 1){
      return value.filter(patient => patient.name.toLowerCase().toString().includes(arg.toLowerCase().toString(), -1));
    }else{
      return value;
    }
  }

}
