import { Injectable } from '@angular/core';
import { Design } from './models'


const DESIGNS: Design[] = [
    {id: 1, title:'hele mooie kaartje', color: 'groen', type: 'dubbel', price : 8},
    {id: 2, title:'rouwkaart', color: 'roze', type: 'enkel', price : 12},
    {id: 3, title: 'baby kaartje', color: 'oranje', type: 'dubbel', price : 1},
    {id: 4, title:'raar kaartje', color: 'groen', type: 'tripple', price : 5}
];

@Injectable()
export class DesignService {
  selectedDesign: Design;
  designs: Design[] = DESIGNS;
  
  getDesigns(): Design[] {
    return this.designs;
  }
  selectDesign(id: number): void {
    this.selectedDesign = this.designs.find(design => design.id === id); 
  }
  
  getSelectedDesign(): Design {
    return this.selectedDesign;
  }
}
