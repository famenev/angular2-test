import { Injectable } from '@angular/core';
import {Order, Design } from './models'

@Injectable()
export class LocalStorageService {
  
    getCurrentOrders(): Order[] {
        return JSON.parse(localStorage.getItem('currentOrders'));
    }
    
    getCurrentOrder(sessionId: number): Order {
        let order: Order;
        if (localStorage.getItem('currentOrders')) {
            let orders: Order[] = JSON.parse(localStorage.getItem('currentOrders'));
            order = orders.find(order => order.id === sessionId);
        }
        return order;
    }
  
    saveCurrentOrder(order: Order): Order {
        if (!localStorage.getItem('currentOrders')) {
            localStorage.setItem('currentOrders', JSON.stringify([]));
        }
        let currentOrders: Order[] = JSON.parse(localStorage.getItem('currentOrders'));
        let oldOrderIndex: number = currentOrders.findIndex(_order => _order.id === order.id);
        if (oldOrderIndex >= 0 ) {
            currentOrders[oldOrderIndex] = order;
        } else {
            currentOrders.push(order);
        }
        localStorage.setItem('currentOrders', JSON.stringify(currentOrders));
        return order;
    }
}
