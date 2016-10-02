import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'edit-selector',
    template: `<div [hidden]='hidden'>
        EDIT
        <span class='editor' > editor </span>
        </div>
    `
})

export class EditComponent implements OnInit{  
    angularVar: string = 'Deze komt uit angular';
    hidden: boolean = true;
    constructor(){}
    ngOnInit() {
        console.log('init');
        
    }
    
   
}
