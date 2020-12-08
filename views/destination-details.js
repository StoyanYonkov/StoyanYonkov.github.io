import { html, render, nothing } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { register , getUserData , login} from '../services/authServices.js';
import { getOneDestination } from '../services/destinationServices.js';



const template = (ctx) => html`  
<!-- Details  -->
<section id="viewdestinationDetails">
            <div class="destination-area">
                <div class="destination-area-left">
                    <img src="${ctx.destination.imgUrl}"
                        alt="">
                </div>
                <div class="destination-area-right">
                    <h3>${ctx.destination.destination}</h3>
                    <div>to ${ctx.destination.city}</div>
                    <div class="data-and-time">
                        ${ctx.destination.departureDate}
                        <a href="/editdestination#${window.location.hash.slice(1)}" class="edit-destination-detail"></a>
                    </div>
                    <div>
                        ${ctx.destination.duration} days
                    </div>
                </div>
            </div>
        </section>
        `;


//TODO: Fix date

class Details extends HTMLElement {
    constructor() {
        super();

    //   this.addEventListener('submit', this.onSubmit);
    }


    connectedCallback() {
        if(!getUserData().isAuthenticated) {       
            Router.go('/');
            return;
        }
        console.log('Loaded Destination Details');

        getOneDestination(window.location.hash.slice(1))
        .then(res => {
        this.userData = getUserData()
           this.destination = res;
           this.render();
        })

    }

    onSubmit(e) {
       
        e.preventDefault();
        
         
    }


    onBeforeEnter(location, commands) {
    }

    render() {
       
        render(template(this), this, { eventContext: this });
    }
};

export default Details;