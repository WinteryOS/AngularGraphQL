import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { AUTHENTICATE_USER } from 'src/graphql';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private apollo: Apollo, private router: Router) {}

  contactForm = new FormGroup({
    //VALIDATION EXAMPLE
    // username: new FormControl('', [
    //   Validators.required,
    //   Validators.pattern(/[a-zA-Z ]*/),
    // ]),
    username: new FormControl(),
    password: new FormControl(),
  });

  ngOnInit(): void {}
  onSubmit() {
    this.apollo
      .mutate({
        mutation: AUTHENTICATE_USER,
        variables: {
          input: {
            username: this.contactForm.value.username,
            password: this.contactForm.value.password,
          },
        },
      })
      .subscribe((res: any) => {
        console.log(res.data.login);
        localStorage.setItem('token', JSON.stringify(res.data.login));
        this.router.navigate(['/']);
      });
  }
}
