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
    username: new FormControl(),
    password: new FormControl(),
  });

  errors: string | null = null;

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
      .subscribe(
        (res: any) => {
          console.log(res.data.login);
          if (res.data.login) {
            console.log('Success');
          } else {
            console.log('Fail');
          }
          localStorage.setItem('token', JSON.stringify(res.data.login));
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        (error) => (this.errors = 'Invalid Username/Password')
      );
  }
}
