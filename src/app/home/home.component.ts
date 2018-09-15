import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx'; // has its own logic for adding imports

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const myNumbers = Observable.interval(1000); // emit a new peice of data every second
    myNumbers.subscribe(
      (number : number) => {
        console.log(number);
      }
    );
  }

}
