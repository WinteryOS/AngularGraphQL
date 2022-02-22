import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { GET_ALL_USERS } from 'src/graphql';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  testData: any[] = [];
  popularMovies: any[] = [];

  constructor(private apollo: Apollo, private http: HttpClient) {}

  ngOnInit(): void {
    //GETS POPULAR DATA
    this.http
      .get(
        'https://api.themoviedb.org/3/movie/popular?api_key=21942037df64bd391a7cff90bc6755db&language=en-US&page=1'
      )
      .subscribe((res: any) => {
        console.log(res?.results);
        this.popularMovies = res?.results;
      });
    //GETS GRAPHQL DATA
    this.apollo
      .watchQuery({
        query: GET_ALL_USERS,
      })
      .valueChanges.subscribe((res: any) => {
        console.log(res.data);
        this.testData = res?.data;
      });
  }
}
