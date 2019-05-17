import { Component, OnInit } from '@angular/core';
import { Users, Address } from './user';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { Cart } from './order/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  

  user: Users;

  constructor(private welcomeService: AppService,
      private router: Router) { }

  ngOnInit() {
      this.user = new Users();
      this.user.address = new Address();
   

  }

  register(): void {

      this.welcomeService.registerNewUser(this.user).subscribe((data) => {

          console.log("success");

          if (data != null) {
             

              alert("registration is successfulPlease, login");


              this.router.navigate(["/home"]);
              var element = document.getElementById("my");
               element.classList.remove("show");
              document.querySelector('.modal-backdrop').classList.remove("fade","modal-backdrop");

          }else{
              alert("Login Unsuccessful    Please ,Try again");
          }

      })


  }


  login(): void {

      let email = (<HTMLInputElement>document.getElementById("email")).value;
      let password = (<HTMLInputElement>document.getElementById("pwd")).value;
      
      this.welcomeService.loginUser(email).subscribe((data) => {
         
          this.user=data;
          if (data != null) {

              if(password==this.user.password){
                  console.log("success");

                  alert("Login successful");
                  let cart = new Cart();
                  cart.email = this.user.email;
                  sessionStorage.setItem("myCart", JSON.stringify(cart));
                  this.router.navigate(["/profile"]);

                  // Json.parse()
            
              sessionStorage.setItem('user', JSON.stringify(this.user));

              }
             
              this.router.navigate(["/profile"]);

              var element = document.getElementById("myModal");
              element.classList.remove("show");
             document.querySelector('.modal-backdrop').classList.remove("fade","modal-backdrop");
          }
      })
  }


}
