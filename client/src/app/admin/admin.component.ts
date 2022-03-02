import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  DELETE_REVIEW,
  DELETE_USER,
  GET_ALL_REVIEWS,
  GET_ALL_USERS,
} from 'src/graphql';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  allUsers: any[] = [];
  allReviews: any[] = [];

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
    //GETS ALL REVIEW DATA
    this.apollo
      .watchQuery({
        query: GET_ALL_REVIEWS,
      })
      .valueChanges.subscribe((res: any) => {
        console.log(res.data);
        this.allReviews = res?.data.getAllReviews;
      });
  }

  deleteUser(id: any) {
    this.apollo
      .mutate({
        mutation: DELETE_USER,
        variables: {
          input: id,
        },
      })
      .subscribe((res: any) => {
        console.log(res.data);
        this.allUsers = this.allUsers.filter((user) => user._id !== id);
      });
  }
  deleteReview(id: any) {
    this.apollo
      .mutate({
        mutation: DELETE_REVIEW,
        variables: {
          input: id,
        },
      })
      .subscribe((res: any) => {
        console.log(res.data);
        this.allReviews = this.allReviews.filter((review) => review._id !== id);
      });
  }
}
