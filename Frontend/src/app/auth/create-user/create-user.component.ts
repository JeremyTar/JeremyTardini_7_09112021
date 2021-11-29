import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {


  signupForm!: FormGroup;
  errorMsg!: string

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  onSignup(): any {
    const formValue = this.signupForm.value;
    console.log(formValue)
    this.userService.createUser(formValue)
      .subscribe((data) => {
        localStorage.setItem('key', JSON.stringify(data));
        this.userService.isAuth = true;
        this.router.navigate(['/main']);
      },
        (error: any) => {
          this.errorMsg = error.message;
          console.log(this.errorMsg);
        });
  }
  //   CreatAccompteclick() {
  //     const newUser;
  //     const email = this.loginForm.get('email').value;
  //     const password = this.loginForm.get('password').value;

  //     const firstName =
  //     const lastName =

  //     data.push(email, password, firstName, lastName,)

  //     this.userService.createUser()
  //     this.creatAccompte = this.userService.Creat;
  //   }
  // }


}
