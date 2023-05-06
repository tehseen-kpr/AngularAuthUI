import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb:FormBuilder) {
    
  }


  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })  
  }

  onSubmit(){
    if(this.loginForm.valid){
      
    }
    else{
      this.validateAllFormFieled(this.loginForm);
      alert('your form is invalid');
      
    }

  }

  private validateAllFormFieled(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFieled(control)
      }
    })
  }

  hideShowPass(){
     this.isText=!this.isText;
     this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
     this.isText?this.type="text":this.type="password";
  }
}
