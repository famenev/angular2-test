import {Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { DesignService } from './design.service';
import { Design } from './models';
import { TodoStore Todo} from './todostore.service';

@Component({
    selector: 'choose-selector',
    template: `
    <div>
        <ul>
        <li *ngFor="let todo of todos">
            {{todo.id}} {{todo.createdOn}} {{todo.value}}
        </li>
    </ul>
    <h1> Kies een kaartje </h1>
    <ul>
        <li *ngFor="let design of designs">
        {{design.title}} {{design.price}}
        <a (click)="chooseCard(design.id)" >edit</a>

        </li>
    </ul>
        <ul>
            <li *ngFor="let todo of todos">{{todo.id}} {{todo.createdOn}} {{todo.value}}</li>
        </ul>
    </div>

    `
})
export class ChooseComponent implements OnInit, OnDestroy { 
    designs: Design[];
    todos: Todo[];
    private todoSubscription;
    constructor(
        private designService: DesignService,
        private router: Router,
        private todoStore: TodoStore
    ){}
    
    ngOnInit() {
        this.designs = this.designService.getDesigns();
        this.todoSubscription = this.todoStore.todos$.subscribe(res => this.todos = res)
    }
    
    ngOnDestroy() {
        this.todoSubscription.unsubscribe();
    }

   chooseCard(id: number){
   // get tab session id, send with choose card request if none -> create one
        this.designService.selectDesign(id);
        this.router.navigate(['/create']);
   }
}
