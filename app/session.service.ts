import { Injectable } from '@angular/core';


@Injectable()
export class SessionService {
  
  getSessionId(): number {
    let id = JSON.parse(sessionStorage.getItem('sessionTabId'));
    if (!id) {
        id = this.createSessionId();
        sessionStorage.setItem('sessionTabId', id);
    }
    return id;
  }
  
  private createSessionId(): number {
    return Math.floor(Math.random() * 100000);
  }
  
}
