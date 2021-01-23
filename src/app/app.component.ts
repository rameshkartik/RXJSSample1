import { Component } from '@angular/core';
import { Observable,fromEvent } from 'rxjs';
import { of } from 'rxjs';
import {delay,scan,throttleTime } from 'rxjs/operators';
//import 'rxjs/add/observable/fromEvent';


@Component({
  selector: 'app-root',
  template : `
  <button id="btnFirst">Button</button>
  <input type="text" id="txtsecond">
  <p>Please see Console Log </p>
  <p> {{ asyncPromise | async }}  </p>
  <p> {{ asyncObservable | async  }} </p>
  `
})
export class AppComponent {
  title = 'ObsFromEventExample';
  asyncPromise:Promise<string>;
  asyncObservable:Observable<string>;

  button:HTMLButtonElement;
  input: HTMLInputElement;


  ngOnInit() {


    this.asyncPromise = this.makePromise("Async Promise Text");
    this.asyncObservable = this.makeObservable("Async Observable Text");

    //RXJS Example 1
    this.button = document.querySelector("#btnFirst") as HTMLButtonElement;
    fromEvent(this.button,'click')
      .subscribe(event => console.log(event));

    this.input = document.querySelector("#txtsecond") as HTMLInputElement;
    fromEvent(this.input,'keyup')
      .subscribe(
        event => console.log(event),
        error => console.log(error),
        () => console.log("complete")
      );

      //RXJS Example 2 :  PIPE, SCAN

      console.log("RXJS Example 2 :  PIPE, SCAN");

      this.button = document.querySelector("#btnFirst") as HTMLButtonElement;
    fromEvent(this.button,'click')
      .pipe(scan(count => count + 1,0))
      .subscribe(event => console.log("RXJS Example 2 :PIPE, SCAN :"  +event));

     this.button = document.querySelector("#btnFirst") as HTMLButtonElement;
    fromEvent(this.button,'click')
      .pipe(
        throttleTime(1000),
        scan(count => count + 1,0)
      )
      .subscribe(event => console.log("RXJS Example 3 :Throttle :"  +event));

     
  }

  makePromise(value:string):Promise<string> {
    return new Promise((resolve,reject) => {
      setTimeout(() => resolve(value),3000);
    })
  }

  makeObservable(value:string):Observable<string> {
   return of(value).pipe(delay(3000)); 
  }

}
