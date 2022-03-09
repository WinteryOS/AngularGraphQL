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

  errors: any = {
    username: null,
    password: null,
    fname: null,
    lname: null,
    street: null,
    city: null,
    state: null,
    zip_code: null,
    email: null,
    phone: null,
  };

  contactForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-zA-Z ]*/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
    fname: new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-zA-Z ]*/),
    ]),
    lname: new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-zA-Z ]*/),
    ]),
    street: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\s*\S+(?:\s+\S+){2}/),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/
      ),
    ]),
    state: new FormControl('', [
      Validators.required,
      Validators.pattern(/[^,]*[A-Z]{2}/),
    ]),
    zip_code: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      ),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
    ]),
  });

  ngOnInit(): void {}

  onSubmit() {
    if (this.errorCheck()) {
      console.log('THERE IS AN ERROR');
    } else {
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

  errorCheck() {
    this.errors = {
      username: this.contactForm.controls.username.errors?.required,
      password: this.contactForm.controls.password.errors?.required,
      fname: this.contactForm.controls.fname.errors?.required,
      lname: this.contactForm.controls.lname.errors?.required,
      street: this.contactForm.controls.street.errors?.required,
      city: this.contactForm.controls.city.errors?.required,
      state: this.contactForm.controls.state.errors?.required,
      zip_code: this.contactForm.controls.zip_code.errors?.required,
      email: this.contactForm.controls.email.errors?.required,
      phone: this.contactForm.controls.phone.errors?.required,
    };

    let tempArr = [];
    for (var key in this.errors) {
      if (!this.errors.hasOwnProperty(key)) continue;
      var obj = this.errors[key];
      tempArr.push(obj);
    }
    if (tempArr.includes(true)) {
      return true;
    }
    return false;
  }
}
