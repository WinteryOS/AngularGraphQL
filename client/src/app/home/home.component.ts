import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filterSearch } from 'src/helpers/filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}

  popularMovies: any[] = [];
  allGenres: any[] = [];
  searchedMovies: any[] = [];
  token: any = null;

  searchForm = new FormGroup({
    title: new FormControl(),
    genre: new FormControl(),
  });

  ngOnInit(): void {
    this.getPopularMovies();
    this.getAllGenres();
    this.token = JSON.parse(localStorage.getItem('token') || 'null');
  }

  onSubmit() {
    if (this.searchForm.value.title) {
      this.http
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=${environment.apiKey}&language=en-US&query=${this.searchForm.value.title}&page=1`
        )
        .subscribe((res: any) => {
          this.searchedMovies = filterSearch(
            res?.results,
            this.searchForm.value.genre
          );
        });
    }
  }

  reset() {
    this.searchedMovies = [];
    this.searchForm.reset();
  }

  getPopularMovies() {
    this.http
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${environment.apiKey}&language=en-US&page=1`
      )
      .subscribe((res: any) => {
        this.popularMovies = res?.results;
      });
  }

  getAllGenres() {
    this.http
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${environment.apiKey}&language=en-US`
      )
      .subscribe((res: any) => {
        console.log(res?.genres);
        this.allGenres = res?.genres;
      });
  }
}
