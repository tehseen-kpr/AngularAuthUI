import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import ValidateForm from 'src/app/heplers/validateform';
import ValdateForm from 'src/app/heplers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";

  /**
   *
   */

  signUpForm!:FormGroup;
  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router) {
    this.signUpForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required]
    });
  }

  ngOnInit(): void {
  
  }

  onSignUp(){
    if(this.signUpForm.valid){
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login']);

        },
        error:(err=>{

          alert(err?.error.message);
        
        })
      })
    }
    else{
      ValidateForm.validateAllFormFieled(this.signUpForm);
      alert('Inavlid Form Data');
    }
  }

  
  hideShowPass(){
     this.isText = !this.isText;
     this.isText ? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
     this.isText ? this.type="text":this.type="password";
  }
}
