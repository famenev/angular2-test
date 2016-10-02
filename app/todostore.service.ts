import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject, Observable } from "rxjs/Rx";
import { Http } from '@angular/http';

import 'rxjs/add/operator/filter';

export class Todo {
    id: number;
    createdOn: string;
    value: boolean;
}


@Injectable()
export class TodoStore {
    private baseUrl: string;
    private _todos$: BehaviorSubject<Todo[]>;
    private todoData: Todo[];

    constructor(private http: Http) {
        this.baseUrl  = 'http://56e05c3213da80110013eba3.mockapi.io/api';
        this._todos$ = <BehaviorSubject<Todo[]>>new BehaviorSubject().do(x => console.log(x));
        this.loadInitialData()
        //Observable.interval(500).timeInterval().take(3).subscribe(x =>console.log('Next: ' + x));
    }

    get todos$() {
        return this._todos$.asObservable();
    }

    loadInitialData() {
        console.log('load data')
        this.http.get(`${this.baseUrl}/todos`).map(response => response.json()).subscribe(data => {
        this.todoData = data;
        this._todos$.next(data);
        }, error => console.log('Could not load todos.'));

    }
    
    sync(todos: Todo[]) {
        console.log('sync');
        let obs = Observable.from(todos)
            .map(x => {x.value = x.value + 1;console.log(x); return x})
            .flatMap(todo => this.http.put(`${this.baseUrl}/todos/${todo.id}`, JSON.stringify(todo)))
            .map(response => response.json()).share();

        let update = obs.filter(response => this.todoData.findIndex(todo => todo.id === response.id) >= 0)
            .map(res => {
                this.todoData[this.todoData.findIndex(todo => todo.id === res.id)] = res;
                return 'update';
            });  
        let new_todo = obs.filter(response => this.todoData.findIndex(todo => todo.id === response.id) === -1)
            .map((res) => {
                this.todoData.push(res);
                return 'new';
            });   
        let test = obs.filter(() => false).map(() => 'true');   

        Observable.merge(update, new_todo, test).subscribe(
            x => console.log(x), 
            () => console.log('error'), 
            () => this._todos$.next(this.todoData)
        );
    }

}