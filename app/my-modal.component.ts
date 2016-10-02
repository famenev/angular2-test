import {Component, Output, ViewChild} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Component({
    selector: 'myModal',
    template: `<div class="myModal" [hidden]="hideModal">
          <!-- your modal HTML here... -->
          <button type="button" class="btn" (click)="clickedYes($event)">Yes</button>
          <button type="button" class="btn" (click)="clickedNo($event)">No</button>
        </div>
    `
})

export class MyModal{
    private hideModal: boolean = true;
    private clickStream = new Subject<boolean>();
    @Output() observable = this.clickStream.asObservable();

    constructor(){}
    openModal(){
        this.hideModal = false;
    }
    closeModal(){
        this.hideModal = true;
    }
    clickedYes(){
        this.clickStream.next(true);
    }
    clickedNo(){
        this.clickStream.next(false);
    }
}
