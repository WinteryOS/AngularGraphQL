import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  title = 'client';
  token: String | null = null;
  admin: String | null = null;

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('token') || 'null');
    if (this.token) {
      let temp = this.token.split(' ');
      this.admin = temp[1];
    }
  }

  signOut() {
    localStorage.removeItem('token');
    this.token = null;
    this.admin = null;
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
