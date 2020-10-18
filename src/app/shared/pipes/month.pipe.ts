import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'month',
  pure: false
})
export class MonthPipe implements PipeTransform {

  transform(value: any[], arg: any): any {
    if(!arg)return value;
    const exist = value.filter(tracing => tracing.createdAt.toLowerCase().includes(arg.toLowerCase(), -1));
    if(exist.length >= 1){
      return value.filter(tracing => tracing.createdAt.toLowerCase().includes(arg.toLowerCase(), -1));
    }else{
      return value;
    }
  }

}
