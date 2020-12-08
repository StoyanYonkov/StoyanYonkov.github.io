import { html, render, nothing } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { register , getUserData , login} from '../services/authServices.js';
import { getAllDestinations } from '../services/destinationServices.js';
import {fixNavigation} from '../scripts/helpers.js'



const template = (ctx) => html`  
<!-- Home -->
<section id="viewCatalog" class="background-img">
<div class="added-destinations">  


            ${ctx.isAuthenticated ? html`${ctx.destinations?.map(destination => html`    
            <a href="/details#${destination.key}" class="added-destination">
                    <img src="${destination.imgUrl}" alt=""
                        class="picture-added-destination">
                    <h3>${destination.destination}</h3>
                    <span>to ${destination.city} </span><span>${destination.departureDate}</span>
            </a>
            `)}          
            ` 
            
            : html`

            <div class="guest">
                No destinations possible! Please sign in...
            </div>

            `}  

            
</div>            
        </section>
        `;




class Home extends HTMLElement {
    constructor() {
        super();

    //   this.addEventListener('submit', this.onSubmit);
    }


    connectedCallback() {
        console.log('Loaded Home');
        
        Object.assign(this, getUserData()) 
        getAllDestinations()
        .then(res => {
            this.destinations = res;
            
            this.render();
            
        })
        
        this.render();
    }

    onSubmit(e) {
       
        e.preventDefault();
        
         
    }


    onBeforeEnter(location, commands) {
    }

    render() {
        fixNavigation();
        render(template(this), this, { eventContext: this });
    }
};

export default Home;