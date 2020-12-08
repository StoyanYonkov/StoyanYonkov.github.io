import { html, render, nothing } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { register , getUserData , login} from '../services/authServices.js';
import {fixNavigation} from '../scripts/helpers.js'



const template = (ctx) => html`  
<!-- Register -->
<section id="viewRegister">
    <h2>Create your account:</h2>
    <form id="formRegister">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" placeholder="Email">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Password">
        <label for="rePassword">Repeat Password:</label>
        <input type="password" id="rePassword" name="rePassword" placeholder="Repeat Password">
        <input type="submit" class="register" value="Register">
    </form>
</section>
        `;




class Register extends HTMLElement {
    constructor() {
        super();

       this.addEventListener('submit', this.onSubmit);
    }


    connectedCallback() {
        console.log('Loaded Register');
        
      //  Object.assign(this, getUserData()) 
      this.render();
      
    }

    onSubmit(e) {
        notify('Loading ...','loading');
        console.log('Register Submited')
        e.preventDefault();
        
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('rePassword');

        if(email.length == 0){
            notify('Email cannot be empty.', 'error'); 
            return;
        }

        if(password.length == 0){
            notify('Password cannot be empty.', 'error'); 
            return;
        }

        if(password.length == 0){
            notify('RePassword cannot be empty.', 'error'); 
            return;
        }

        if(password != repeatPassword){
            notify('Passwords need to match.', 'error'); 
            return;
        }

  
     let res = register(email,password)
       .then(res => {
        notify('User registration successful.', 'info');
       // console.log(res)
       // console.log(getUserData());
        
  
        })
        .catch(err => {
        notify(err, 'error');
        });
        
          this.render();
        
         
    }


    onBeforeEnter(location, commands) {
    }

    render() {
        fixNavigation();
        render(template(this), this, { eventContext: this });
    }
};

export default Register;