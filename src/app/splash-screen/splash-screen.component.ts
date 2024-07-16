import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('Splash screen loaded');
    setTimeout(() => {
      console.log('Navigating to /tabs');
      this.router.navigateByUrl('/tabs').then(success => {
        console.log('Navigation success:', success);
      }).catch(error => {
        console.error('Navigation error:', error);
      });
    }, 8000); // 2 seconds
  }
}
