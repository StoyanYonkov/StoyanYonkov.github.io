import { getUserData } from '../services/authServices.js';


export function fixNavigation()  {
        let userData = getUserData();
        console.log('navfix')
        let logout = document.querySelector("#container > nav > div.right-container > a")
        let register = document.querySelector("#container > nav > div.left-container > ul > li:nth-child(5)")
        let login = document.querySelector("#container > nav > div.left-container > ul > li:nth-child(4)")
        let welcome = document.querySelector("#container > nav > div.right-container > span")
        let add = document.querySelector("#container > nav > div.left-container > ul > li:nth-child(3)")
        let destinations = document.querySelector("#container > nav > div.left-container > ul > li:nth-child(2)");
        if(getUserData().isAuthenticated) {
            register.style.display = 'none';
            login.style.display = 'none';
          
            add.style.display = 'inline-block';
            destinations.style.display = 'inline-block';
            welcome.style.display = '';
            logout.style.display = 'inline-block';


            welcome.innerHTML = `Welcome, {${userData.email}}`;           
        } else {
            add.style.display = 'none';
            destinations.style.display = 'none';
            welcome.style.display = 'none';
            logout.style.display = 'none';

            register.style.display = 'inline-block';
            login.style.display = 'inline-block';
        }

}