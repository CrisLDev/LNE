import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsletterService } from '@core/services/newsletter.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  newsletterForm: FormGroup;

  constructor(
              private fb: FormBuilder,
              private newsletterService: NewsletterService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
  }

  get f() { return this.newsletterForm.controls; }

  private createForm(){
    this.newsletterForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(40)])]
    })
  }

  submit(){
    document.getElementById("newsletterButton").setAttribute("disabled", "true");
    document.getElementById("newsletterButton").innerHTML = "Enviando";
    this.newsletterService.createNewsletter(this.newsletterForm.value).subscribe(
      res => {this.toastr.success('Email agregado correctamente');
              localStorage.setItem('newsletter', 'true');
              document.getElementById("newsletter").classList.add("d-none");
            },
      err => {this.toastr.error('el Email ya existe');
              document.getElementById("newsletterButton").removeAttribute("disabled")}
    )
  }

}
