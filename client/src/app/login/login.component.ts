import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

const GET_ALL_USERS = gql`
  {
    getAllUsers {
      fname
      city
      street
    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  testData: any[] = [];
  contactForm = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
  });

  ngOnInit(): void {}
  onSubmit() {
    // this.apollo
    //   .watchQuery({
    //     query: GET_ALL_USERS,
    //   })
    //   .valueChanges.subscribe((res: any) => {
    //     console.log(res.data);
    //     this.testData = res?.data;
    //   });
    console.log(this.contactForm.value);
  }
}
