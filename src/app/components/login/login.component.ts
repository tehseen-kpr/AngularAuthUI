import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/heplers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";

  /**
   *
   */

  loginForm!:FormGroup; 

  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router,private userStore:UserStoreService) {
    
  }


  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })  
  }

  onLogin(){
    if(this.loginForm.valid){
      /* console.log(this.loginForm.value); */

      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload=this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.fullName);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.router.navigate(['dashboard']);
        },
        error:(err=>{
          alert(err?.error.message)
        })
        
      });
    }
    else{
      ValidateForm.validateAllFormFieled(this.loginForm);
      alert('your form is invalid');
      
    }

  }

  

  hideShowPass(){
     this.isText=!this.isText;
     this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
     this.isText?this.type="text":this.type="password";
  }
}
