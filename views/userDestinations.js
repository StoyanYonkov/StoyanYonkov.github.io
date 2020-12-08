import { html, render, nothing } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { register , getUserData , login} from '../services/authServices.js';
import { getAllDestinations, getOneDestination , deleteDestination } from '../services/destinationServices.js';



const template = (ctx) => html`  
<section id="viewMydestinations">
            <h3>Your destinations</h3>

            


            ${ctx.isAuthenticated ? html`
            ${ctx.destinations?.map(destination => html`    
            <div class="destination-ticket">
                <div class="destination-left">
                    <img src="${destination.imgUrl}" alt="">
                </div>
                <div class="destination-right">
                    <div>
                        <h3>${destination.destination}</h3><span>${destination.departureDate}</span>
                    </div>
                    <div>
                        to ${destination.city}
                    </div>
                    <p>${destination.duration} days </p>
                    <a href="/userdestinations" data-id="${destination.key}" @click=${ctx.onDelete} class="remove">REMOVE</a>
                    <a href="/details#${destination.key}" class="details">Details</a>
                </div>
            </div>
            `)}          
            ` 
            
            : html``} 


        </section>
        `;




class UserDestinations extends HTMLElement {
    constructor() {
        super();

    //   this.addEventListener('submit', this.onSubmit);
    }


    connectedCallback() {
        console.log('Loaded UserDestinations');
        
        Object.assign(this, getUserData()) 

        let currentUser = JSON.parse(localStorage.getItem('auth')).email;
        getAllDestinations(currentUser)
        .then(res => {
            this.destinations = res;
            this.render();
        })
      
        this.render();
    }

    onSubmit(e) {
       
        e.preventDefault();
        
         
    }

    onDelete(e) {
        let destinationId = e.target.getAttribute('data-id');     
        //Validate if user can delete the movie
        getOneDestination(destinationId)
        .then(res => {
           this.userData = getUserData()
           
          if(this.userData.email == res.creator) {
            deleteDestination(destinationId)
            .then(res => {
                notify('Destination removed.','info');                          
                      this.connectedCallback()
                      this.render(template(this), this, { eventContext: this });
                   
            })         
               
          }
        })
    }


    onBeforeEnter(location, commands) {
    }

    render() {
        render(template(this), this, { eventContext: this });
    }
};

export default UserDestinations;