import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AskUsService } from '@core/services/ask-us.service';
import { AuthService } from '@core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ask-us',
  templateUrl: './ask-us.component.html',
  styleUrls: ['./ask-us.component.css']
})
export class AskUsComponent implements OnInit {

  askUsForm: FormGroup;

  constructor(private fb: FormBuilder, private askUsService: AskUsService, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm();
  }

  get f() { return this.askUsForm.controls; }

  private createForm(){
    this.askUsForm = this.fb.group({
      user_id: [],
      title: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(60)])],
      content: ['', Validators.compose([Validators.minLength(6)])]
    })
  }

  submit(){
    this.askUsForm.value.user_id = this.authService.userLogged.id;
    document.getElementById("askUsButton").setAttribute("disabled", "true");
    document.getElementById("askUsButton").innerHTML = "Enviando";
    this.askUsService.createQuestion(this.askUsForm.value).subscribe(
      res => {this.toastr.success('Pregunta enviada correctamente.');
              document.getElementById("askUsButton").removeAttribute("disabled");
              document.getElementById("askUsButton").innerHTML = "Enviar";},
      err => {this.toastr.error(err.error.errors[0].msg);
              document.getElementById("askUsButton").removeAttribute("disabled");
              document.getElementById("askUsButton").innerHTML = "Enviar";}
    )
  }

}
