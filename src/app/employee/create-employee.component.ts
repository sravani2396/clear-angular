import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm:FormGroup;
  validationMessages={
    'fullName':{
      'required':'Full name is required.',
      'minlength':'Full name must be greater than 2 characters.',
      'maxlength':'Full name must be less than 10 characters.'
    },
    'email':{
      'required':'Email is required.'
    },
    'skillName':{
      'required':'skill name is required',
    },
    'experienceInYears':{
      'required':'proficiency is required.',
    },
  };

  formErrors={
    'fullName':'',
    'email':'',
    'skillName':'',
    'experienceInYears':'',
    'proficiency':''
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName:['', [Validators.required,Validators.minLength(2), Validators.maxLength(10)]],
      email:['',Validators.required],
      skills: this.fb.group({
       skillName:['',Validators.required],
       experienceInYears: ['',Validators.required],
       proficiency:['',Validators.required] 
      })
    });
    this.employeeForm.valueChanges.subscribe((data)=>{
      this.logValidationErrors(this.employeeForm);
    });
  }
  logValidationErrors(group:FormGroup=this.employeeForm):void{
    Object.keys(group.controls).forEach((key:string)=>{
     const abstractControl= group.get(key);
     if(abstractControl instanceof FormGroup){
       this.logValidationErrors(abstractControl);
     }else{
       this.formErrors[key]='';
       if(abstractControl && !abstractControl.valid &&
        (abstractControl.touched||abstractControl.dirty)){
         const messages= this.validationMessages[key];
         for(const errorKey in abstractControl.errors){
           if(errorKey){
            this.formErrors[key] +=messages[errorKey] + '';

           }
         }
       }
     }
    });
  }
  onLoadDataClick():void{
    this.logValidationErrors(this.employeeForm);
    console.log(this);
  }
  onSubmit():void{
    console.log(this.employeeForm.touched);
    console.log(this.employeeForm.value);
    console.log(this.employeeForm.controls.fullName.touched);
    console.log(this.employeeForm.get('fullName').value);
    
  }

}
