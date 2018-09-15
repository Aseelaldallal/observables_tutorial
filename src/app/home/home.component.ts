import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators'; // has its own logic for adding imports

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  numbersObservablesSubsription: Subscription;
  customObservableSubscription: Subscription;

  constructor() { }

  ngOnInit() {

    // memory leak if you don't destroy it
    const myNumbers = interval(1000) // emit a new peice of data every second
      .pipe(map( (data : number) => {
          return data * 2;
      })); 
    this.numbersObservablesSubsription = myNumbers.subscribe(
      (number : number) => {
        console.log(number);
      }
    );

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package'); // just pushes the next data package
      }, 2000);
      setTimeout(() => {
        observer.next('Second package'); // just pushes the next data package
      }, 4000);
      setTimeout(() => {
        //observer.error('this does not work')
        observer.complete();
      }, 6000);
      setTimeout(() => {
        observer.next('Third package'); // you never get here because we completed
      }, 6000);
    })

    this.customObservableSubscription = myObservable.subscribe( 
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('Completed');
      }
    )
  }

  ngOnDestroy() { // important
    this.numbersObservablesSubsription.unsubscribe();
    this.customObservableSubscription.unsubscribe();
  }

  // fyi angular cleans up its own observables automatically, but implementing ngOnDestory is a good habbit

}
