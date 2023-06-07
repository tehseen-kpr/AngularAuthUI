import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from '../models/reset-password.model';
import { ConfirmPasswordValidator, } from '../heplers/confirm-password.validator';
import { ActivatedRoute, Router } from '@angular/router';
import ValidateForm from '../heplers/validateform';
import { ResetPasswordService } from '../services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!:FormGroup;
  emailToReset!:string;
  emailToken!:string;
  resetPasswordObj = new ResetPassword();

  /**
   *
   */
  constructor(private fb:FormBuilder,private activatedRoute:ActivatedRoute,private resetService:ResetPasswordService,private router:Router) {
    
    
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password:[null,Validators.required],
      confirmPassword:[null,Validators.required]
    },
    {
      validator:ConfirmPasswordValidator("password","confirmPassword")
    });
    
    this.activatedRoute.queryParams.subscribe(val=>{
      this.emailToReset = val['email'];
      let uriToken = val['code'];
      this.emailToken = uriToken.replace(/ /g,'+');

    })
    
  }

  reset(){
    if(this.resetPasswordForm.valid){
        this.resetPasswordObj.email = this.emailToReset;
        this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
        this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
        this.resetPasswordObj.emailToken = this.emailToken;

        this.resetService.resetPassword(this.resetPasswordObj)
        .subscribe({
          next:(res)=>{
            alert('password reset successfully!');
            this.router.navigate(['/']);
          },
          error:(err:any)=>{
            alert('somthing went wrong');
          }
        })
    }
    else{
      ValidateForm.validateAllFormFieled(this.resetPasswordForm);
    }
  }
}
