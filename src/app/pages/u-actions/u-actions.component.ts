import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-u-actions',
  templateUrl: './u-actions.component.html',
  styleUrls: ['./u-actions.component.css']
})
export class UActionsComponent implements OnInit {

  user = {username: '', email: '', password: ''};

  constructor() { }

  ngOnInit(): void {
  }

  signUp(){
    console.log(this.user)
  }

}
