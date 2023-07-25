import { INavbarData } from "./helpers";

export const navbarData:INavbarData[] =[
    {
        routeLink:'/home',
        icon:'fal fa-home',
        label:'Home'
    },
    {
        routeLink:'/dashboard',
        icon:'fal fa-dashboard',
        label:'Dashboard'
    },

    {
        routeLink:'/products',
        icon:'fal fa-box-open',
        label:'Products',
        items:[
            {
                routeLink:'product/level1.1',
                label:'Level 1.1',
                items:[
                    {
                        routeLink:'product/level2.1',
                        label:'Level 2.1'
                    },
                    {
                        routeLink:'product/level2.2',
                        label:'Level 2.2',
                        items:[
                            {
                                routeLink:'product/level3.1',
                                label:'Level 3.1'
                            },
                            {
                                routeLink:'product/level3.1',
                                label:'Level 3.1'
                            }
                        ]
                    }
                ]
            },
            {
                routeLink:'product/level1.2',
                label:'Level 1.2',

            }
        ]
    },

    {
        routeLink:'/backup',
        icon:'fal fa-database',
        label:'Backup'
    },

    {
        routeLink:'/settings',
        icon:'fal fa-cog',
        label:'Settings',
        items:[
            {
                routeLink:'settings/profile',
                label:'Profile'
            },
            {
                routeLink:'settings/customize',
                label:'Customize'
            }

        ]
    }    

    
]

/* Type '({ routerLink: string; icon: string; label: string; } | { routerLink: string; icon: string; label: string; items: { routerLink: string; label: string; }[]; })[]' is missing the following properties from type 'INavbarData': routerLink, label */