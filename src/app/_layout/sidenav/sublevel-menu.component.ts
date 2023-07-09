import { Component, Input } from '@angular/core';
import { INavbarData } from './helpers';

@Component({
  selector: 'app-sublevel-menu',
  template: `
    <p>
      sublevel-menu works!
    </p>
  `,
  styleUrls:['./sidenav.component.scss']
})
export class SublevelMenuComponent {
@Input() data:INavbarData ={
  routerLink:'',
  icon:'',
  label:'',
  items:[]

}

@Input() collapsed=false;
@Input() animating:boolean | undefined;
@Input() expanded: boolean | undefined;
@Input() multiple:boolean=false;
}
