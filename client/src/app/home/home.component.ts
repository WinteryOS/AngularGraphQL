import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // data: any[];
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_ALL_USERS,
      })
      .valueChanges.subscribe((res: any) => {
        console.log(res.data);
        // this.data = res?.data;
      });

    // this.apollo.use(uri).watchQuery()
  }
}

// this.http
//   .get(
//     'https://api.themoviedb.org/3/movie/popular?api_key=21942037df64bd391a7cff90bc6755db&language=en-US&page=1'
//   )
//   .subscribe((res) => {
//     console.log(res);
//   });
