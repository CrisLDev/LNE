import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dni'
})
export class DniPipe implements PipeTransform {

  transform(value: any[], arg: any): any {
    if(!arg)return value;
    const exist = value.filter(tracing => tracing.patient_id.dni.toString().includes(arg.toString(), -1));
    if(exist.length >= 1){
      return value.filter(tracing => tracing.patient_id.dni.toString().includes(arg.toString(), -1));
    }else{
      return value;
    }
  }

}
