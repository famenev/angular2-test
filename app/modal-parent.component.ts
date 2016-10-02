import { Component, ViewChild, OnInit} from '@angular/core';
import {MyModal} from './my-modal.component';
//import {Subscription} from "rxjs/Subscription";
import 'rxjs/add/operator/first';
@Component({
    selector: 'my-modal-parent',
    template: `
    <div> parent 
        <span (click)="showModal()"> open </span> 
        <span (click)="closeModal()"> close </span> 
        <myModal> </myModal>  
    </div>`
})

export class ModalParentComponent implements OnInit{
    @ViewChild(MyModal) myModal: MyModal;

    //subscription: Subscription;
    
    constructor(){};
    ngOnInit() {
        //this.subscription = this.myModal.observable.subscribe(x => this.log(x));
    }
    
    public closeModal() {
        this.myModal.closeModal();
    }

    public showModal(){
        this.myModal.observable.first().subscribe(x => this.log(x));
        this.myModal.openModal();
    }
    
    private log(x: boolean) {
        console.log('observable called ' + String(x))
        if (x) {
            
        } else {
        }
        
    }
}