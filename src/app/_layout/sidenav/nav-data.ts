export const navbarData=[
    {
        routerLink:'dashboard',
        icon:'fal fa-dashboard',
        label:'dashboard'
    },

    {
        routerLink:'login',
        icon:'fal fa-user',
        label:'login'
    },

    {
        routerLink:'signup',
        icon:'fal fa-user-plus',
        label:'signup',
        items:[
            {
            routerLink:'component/login',
            label:'signin'
           },
           {
            routerLink:'component/login',
            label:'signin'
           }
    ]
        
    }

    
]

