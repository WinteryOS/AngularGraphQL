import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  id: String | null = '';
  movie: any = '';
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.http
      .get(
        `https://api.themoviedb.org/3/movie/${this.id}?api_key=21942037df64bd391a7cff90bc6755db&language=en-US`
      )
      .subscribe((res: any) => {
        console.log(res);
        this.movie = res;
      });
  }
}
