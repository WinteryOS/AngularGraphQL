import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_USERS } from 'src/graphql';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  allUsers: any[] = [];

  ngOnInit(): void {
    //GETS ALL USERS DATA
    this.apollo
      .watchQuery({
        query: GET_ALL_USERS,
      })
      .valueChanges.subscribe((res: any) => {
        console.log(res.data);
        this.allUsers = res?.data.getAllUsers;
      });
  }
}
