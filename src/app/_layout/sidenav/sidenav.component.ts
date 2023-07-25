import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { INavbarData } from './helpers';
interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{

  @Output() onToggleSideNav:EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed:boolean = false;
  screenWidth = 0;
  navData = navbarData;
  multiple:boolean = false;
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }
  @HostListener('window:resize',['$event'])

  onResize(event:any): void{
    this.screenWidth = window.innerWidth;

    if(this.screenWidth <= 768){
      this.collapsed=false;
      this.onToggleSideNav.emit({
        collapsed:this.collapsed,screenWidth:this.screenWidth
      });
    }
  }

  

  toggleCollapse():void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed:this.collapsed,
      screenWidth:this.screenWidth
    })
  }

  closeSidenav():void{
    this.collapsed=false;
    this.onToggleSideNav.emit({
      collapsed:this.collapsed,
      screenWidth:this.screenWidth
    })
  }

  handleClick(item:INavbarData):void{
    if(!this.multiple){
      for(let modelItem of this.navData){
        if(item !== modelItem && modelItem.expanded){
          modelItem.expanded=false;
        }
      }
    }
    item.expanded = !item.expanded
  }

}
