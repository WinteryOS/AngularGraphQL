import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { CREATE_USER } from 'src/graphql';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private apollo: Apollo, private router: Router) {}

  contactForm = new FormGroup({
    //VALIDATION EXAMPLE
    // username: new FormControl('', [
    //   Validators.required,
    //   Validators.pattern(/[a-zA-Z ]*/),
    // ]),
    username: new FormControl(),
    password: new FormControl(),
    fname: new FormControl(),
    lname: new FormControl(),
    street: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    zip_code: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
  });

  ngOnInit(): void {}

  onSubmit() {
    this.apollo
      .mutate({
        mutation: CREATE_USER,
        variables: {
          input: {
            username: this.contactForm.value.username,
            password: this.contactForm.value.password,
            fname: this.contactForm.value.fname,
            lname: this.contactForm.value.lname,
            street: this.contactForm.value.street,
            city: this.contactForm.value.city,
            state: this.contactForm.value.state,
            zip_code: this.contactForm.value.zip_code,
            email: this.contactForm.value.email,
            phone: this.contactForm.value.phone,
            admin: false,
          },
        },
      })
      .subscribe((res: any) => {
        console.log(res.data.createUser);
        this.router.navigate(['/']);
      });
  }
}
