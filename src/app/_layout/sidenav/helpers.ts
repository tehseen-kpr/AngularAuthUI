export interface INavbarData {
    routeLink:string;
    icon?:string;
    label:string;
    expanded?:boolean;
    items?:INavbarData[];
}

//ng g c sublevel-menu --inline-template --inline-style --flat true

