import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/heplers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
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
  public resetPasswordEmail!:string;
  public isValidEmail!:boolean;

  /**
   *
   */

  loginForm!:FormGroup; 

  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router,private userStore:UserStoreService,private resetService:ResetPasswordService) {
    
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
          //alert(res.message);
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

  checkValidEmail(event:any){
     const value=event;
     /* const pattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" */

     const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;

     this.isValidEmail = pattern.test(value);
     return this.isValidEmail;
  }

  confirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail);
      this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
      .subscribe({
        next:(res)=>{
          this.resetPasswordEmail="";
          const buttonRef = document.getElementById("closeBtn");
          buttonRef?.click();
        },
        error:(err)=>{
            alert('Some thing wents wrong');
        }
      })
      
      
      
    }
  }
}
