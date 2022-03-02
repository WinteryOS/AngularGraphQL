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
    console.log('INITIALIZED');
    this.token = JSON.parse(localStorage.getItem('token') || 'null');
    if (this.token) {
      let temp = this.token.split(' ');
      this.admin = temp[1];
    }
    console.log(this.token);
  }

  signOut() {
    localStorage.removeItem('token');
    this.token = null;
    this.admin = null;
    this.router.navigate(['/']);
    console.log('SIGN OUT');
  }
}
