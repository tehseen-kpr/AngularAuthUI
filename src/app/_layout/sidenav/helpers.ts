export interface INavbarData{
    routerLink:string;
    icon?:string;
    label:string;
    expanded?:string;
    items?:INavbarData[];
}

//ng g c sublevel-menu --inline-template --inline-style --flat true

