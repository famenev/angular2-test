import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from './localstorage.service'
import { Order } from './models'
import { TodoStore, Todo} from './todostore.service'
import {BehaviorSubject, Observable} from "rxjs/Rx";

@Component({
    selector: 'my-app',
    template: `<h2>kaartjes winkel App</h2>
    <router-outlet> </router-outlet>
    <hr>
    <hr>
            <button *ngIf='todos' (click)="test()"> Sync </button>
<hr>
    <span> Tab sessions: </span>
    <ul>
        <li *ngFor="let session of sessions">
            <ul>
                <li>{{session.id}}</li>
                <li *ngIf='session.design'>{{session.design.id}} {{session.design.title}} {{session.design.color}} {{session.design.price}}</li>
            </ul>
        </li>
    </ul>
    <ul>
        <li *ngFor="let todo of todos">
            {{todo.id}} {{todo.createdOn}} {{todo.value}}
        </li>
    </ul>
    `
})
export class AppComponent implements OnInit, OnDestroy { 
    
    sessions: Order[];
    private todos: Todo[]
    private todoSubscription;
    constructor(
        private storageService: LocalStorageService,
        private todoStore: TodoStore

    ){}
    
    ngOnInit() {
        this.sessions = this.storageService.getCurrentOrders();
        //Observable.interval(5000).map(() => this.todoStore.loadInitialData()).subscribe();
        this.todoSubscription = this.todoStore.todos$.subscribe(res => this.todos = res);
    }

    ngOnDestroy() {
        this.todoSubscription.unsubscribe();
    }
    
    test(): void {
        this.todoStore.sync(this.todos);
    }

    
    

}
