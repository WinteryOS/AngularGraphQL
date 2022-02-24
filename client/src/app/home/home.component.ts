import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}

  popularMovies: any[] = [];

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
  }
}
