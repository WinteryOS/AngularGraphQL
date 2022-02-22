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

  ngOnInit(): void {
    console.log('INITIALIZED');
    this.token = JSON.parse(localStorage.getItem('token') || 'null');
    console.log(this.token);
  }

  signOut() {
    localStorage.removeItem('token');
    this.token = null;
    this.router.navigate(['/']);
    console.log('SIGN OUT');
  }
}
