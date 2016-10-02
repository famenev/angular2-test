import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';
import { HttpModule }    from '@angular/http';

import { SessionService }    from './session.service';
import { LocalStorageService }    from './localstorage.service';

import { DesignService }    from './design.service';
import { AppComponent }  from './app.component';
import { ChooseComponent }      from './choose.component';
import { CreateComponent }      from './create.component';
import { TodoStore} from './todostore.service'



@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    routing
  ],
  declarations: [ 
    AppComponent,
    ChooseComponent,
    CreateComponent
  ],
  providers: [
    DesignService, 
    SessionService,
    LocalStorageService,
    TodoStore

  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
