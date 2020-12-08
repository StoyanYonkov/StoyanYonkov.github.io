import { html, render, nothing } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { register , getUserData , login} from '../services/authServices.js';
import {fixNavigation} from '../scripts/helpers.js'



const template = (ctx) => html`  
 <!-- Login -->
 <section id="viewLogin">
            <h2>Login to your account:</h2>
            <form id="formLogin">
                <label for="email">Email:</label>
                <input type="text" id="email" name="email" placeholder="Enter your Email">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your Password">
                <input type="submit" class="login" value="Login">
            </form>
        </section>
        `;




class Login extends HTMLElement {
    constructor() {
        super();

       this.addEventListener('submit', this.onSubmit);
    }


    connectedCallback() {
        console.log('Loaded Login');
        
      //  Object.assign(this, getUserData()) 

      
        this.render();
    }

    onSubmit(e) {
        console.log('Login Submited')
        notify('Loading ...','loading');
        e.preventDefault();
        
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');

        if(email.length == 0){
            notify('Email cannot be empty.', 'error'); 
            return;
        }

        if(password.length == 0){
            notify('Password cannot be empty.', 'error'); 
            return;
        }

        let res = login(email,password)
        .then(res => {
         notify('Login successful.', 'info');

         setTimeout(() => {
             
            Router.go('/');

         }, 1500);

         })
         .catch(err => {          
         notify(err, 'error');
         });

      
         
    }


    onBeforeEnter(location, commands) {
    }

    render() {
        fixNavigation();
        render(template(this), this, { eventContext: this });
    }
};

export default Login;