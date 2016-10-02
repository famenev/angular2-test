import {Component, OnInit, OnDestroy} from '@angular/core';
import { DesignService } from './design.service';
import { SessionService } from './session.service';
import { LocalStorageService } from './localstorage.service';
import { Order } from './models';
import { TodoStore} from './todostore.service'
import { Subject } from 'rxjs/Subject';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';

@Component({
    selector: 'create-selector',
    template: `
    <div *ngIf="order">
    <h1> Editor </h1>

        {{order.design.title}}
        {{order.id}}
    </div>
    <div *ngIf="!order">
        selecteer order in sessie of ga terug en kies een kaartje
        <ul>
        <li *ngFor="let order of allSessions"> 
            {{order.id}} {{order.design.title}} <button (click)=chooseOrder(order)> kies </button>
        </li>
        </ul>
    </div>
    `
})

export class CreateComponent implements OnInit, OnDestroy { 
    order: Order = new Order();
    sessionId: number;
    allSessions: Order[];
    private requestStream = new Subject<number>();
    private orderStream = new Subject<Order>();
    private todoSubscription;
    constructor(
        private designService: DesignService,
        private sessionService: SessionService,
        private storageService: LocalStorageService,
        private todoStore: TodoStore
    ){}
    
    ngOnDestroy() {
        this.todoSubscription.unsubscribe();
    }
    ngOnInit() {
        this.order.id = this.sessionService.getSessionId();
        this.order.design = this.designService.getSelectedDesign();
        this.todoSubscription = this.todoStore.todos$.subscribe(todos => this.todos = todos);
        
        //if (this.order.design) {
            this.order = this.storageService.saveCurrentOrder(this.order);
        //} else {
            this.order = this.storageService.getCurrentOrder(this.order.id);
        //}
        //if (!this.order) {
        //    this.allSessions = this.storageService.getCurrentOrders();
        //}
        /*
        this.orderStream
          .startWith(this.order)
          .debounceTime(500)        // wait for 100ms pause in events
          .distinctUntilChanged((a,b) => {
            return a === b;
          },x => JSON.stringify(x))
          .switchMap(order => order.design ? this.storageService.saveCurrentOrder(order) : this.storageService.getCurrentOrder(order.id) )
          .catch(error => {
            // TODO: real error handling
            console.log(error);
            return Observable.of<any>();
          })
          .subscribe(response => this.order = response);
        
        
        let even = this.requestStream.filter(x => x % 2 === 0);
        let odd = this.requestStream.filter(x => x % 2 !== 0);
        even.subscribe(x => console.log('EVEN: %s', x));
        odd.subscribe(x => console.log('ODD: %s', x));
        this.requestStream.next(2);
        this.requestStream.next(1);
        this.requestStream.next(4323434);
        this.requestStream.next(4343);
        this.requestStream.next(343);
        this.requestStream.next(33);
        */
    }
    
    chooseOrder(order: Order) {
        this.order = order;
        this.order.id = this.sessionId;
        this.storageService.saveCurrentOrder(this.order);
    }

}
