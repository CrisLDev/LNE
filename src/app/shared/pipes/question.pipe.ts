import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'question'
})
export class QuestionPipe implements PipeTransform {

  transform(value: any[], arg: any): any {
    if(!arg)return value;
    const exist = value.filter(question => question.title.toLowerCase().toString().includes(arg.toLowerCase().toString(), -1));
    if(exist.length >= 1){
      return value.filter(question => question.title.toLowerCase().toString().includes(arg.toLowerCase().toString(), -1));
    }else{
      return value;
    }
  }

}
