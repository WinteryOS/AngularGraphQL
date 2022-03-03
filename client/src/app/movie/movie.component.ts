import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { CREATE_REVIEW, GET_ALL_REVIEWS } from 'src/graphql';
import { environment } from 'src/environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private http: HttpClient,
    private modalService: NgbModal
  ) {}

  contactForm = new FormGroup({
    ctrl: new FormControl(null, Validators.required),
    message: new FormControl(null, Validators.required),
  });

  closeResult = '';
  id: String | null = '';
  // token: String | null = '';
  tempUsername: String | undefined = '';
  movie: any = '';
  reviews: any[] = [];
  currentRate = 5;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const token = JSON.parse(localStorage.getItem('token') || 'null');
    const tempArr = token.split(' ');
    this.tempUsername = tempArr[2];
    //GET INDIVIDUAL MOVIE DATA
    this.http
      .get(
        `https://api.themoviedb.org/3/movie/${this.id}?api_key=${environment.apiKey}&language=en-US`
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

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  onSubmit() {
    console.log(this.contactForm.value);
    console.log(this.tempUsername);
    // this.tempUsername = this.token?.split(' ');
    // console.log(this.tempUsername[2] || undefined)
    // console.log(tempUser[2] ?? "");
    this.apollo
      .mutate({
        mutation: CREATE_REVIEW,
        variables: {
          input: {
            username: this.tempUsername,
            movieId: this.id,
            rating: this.contactForm.value.ctrl,
            review: this.contactForm.value.message,
          },
        },
      })
      .subscribe((res: any) => {
        console.log(res.data.createReview);
        //ADD REVIEW TEMPORARILY
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
