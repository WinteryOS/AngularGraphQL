import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { GET_ALL_REVIEWS } from 'src/graphql';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  id: String | null = '';
  movie: any = '';
  reviews: any[] = [];

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    //GET INDIVIDUAL MOVIE DATA
    this.http
      .get(
        `https://api.themoviedb.org/3/movie/${this.id}?api_key=21942037df64bd391a7cff90bc6755db&language=en-US`
      )
      .subscribe((res: any) => {
        console.log(res);
        this.movie = res;
      });

    //GET ALL REVIEW DATA
    this.apollo
      .watchQuery({
        query: GET_ALL_REVIEWS,
      })
      .valueChanges.subscribe((res: any) => {
        res?.data.getAllReviews.forEach((review: any) => {
          if (review.movieId === this.id) {
            this.reviews.push(review);
          }
        });
        console.log(this.reviews);
      });
  }
}
