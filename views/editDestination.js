import { html, render, nothing } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { register , getUserData , login} from '../services/authServices.js';
import { getOneDestination , editDestination } from '../services/destinationServices.js';



const template = (ctx) => html`  
 <!-- Edit  -->
 <section id="viewEditdestination">
            <h2>Edit existing destination</h2>
            <form id="formAdddestination">
                <label for="destination">Destination name:</label>
                <input type="text" id="destination" name="destination" value="${ctx.destination.destination}">
                <label for="city">City:</label>
                <input type="text" id="city" name="city" value="${ctx.destination.city}">
                <label for="duration">Duration:</label>
                <input type="number" id="duration" name="duration" value="${ctx.destination.duration}">
                <label for="departureDate">Departure Date:</label>
                <input type="date" id="departureDate" name="departureDate" value="${ctx.destination.departureDate}">
                <label for="imgUrl">Image:</label>
                <input type="text" id="imgUrl" name="imgUrl"
                    value="${ctx.destination.imgUrl}">

                <input type="submit" class="create" value="Edit">
            </form>
        </section>
        `;

class EditDestination extends HTMLElement {
    constructor() {
        super();

       this.addEventListener('submit', this.onSubmit);
    }


    connectedCallback() {
        if(!getUserData().isAuthenticated) {       
            Router.go('/');
            return;
        }
        console.log('Loaded Destination Edit');

        getOneDestination(window.location.hash.slice(1))
        .then(res => {
        this.userData = getUserData()
            if(res.creator !== getUserData().email){
                notify('You do not have permissions to edit this destination.','error')
                Router.go('/');
            }

           this.destination = res;
           this.render();
        })

    }

    onSubmit(e) {

        if(!getUserData().isAuthenticated) {       
            Router.go('/');
            return;
        }
        notify('Loading ...','loading');
        e.preventDefault();
        

        let formData = new FormData(e.target);
        let destination = formData.get('destination');
        let city = formData.get('city');
        let duration = formData.get('duration');
        let departureDate = formData.get('departureDate');
        let imgUrl = formData.get('imgUrl');

        if(destination.length == 0){
            notify('Destination cannot be empty.','error');
            return;
        }

        if(city.length == 0){
            notify('City cannot be empty.','error');
            return;
        }

        if(duration.length == 0){
            notify('Duration cannot be empty.','error');
            return;
        }

        if(Number(duration) < 1 || Number(duration) > 100){
            notify('Duration needs to be between 1 and 100 days.','error');
            return;
        }

        if(departureDate.length == 0){
            notify('Departure Date cannot be empty.','error');
            return;
        }

        if(imgUrl.length == 0){
            notify('Image url cannot be empty.','error');
            return;
        }

        let destinationid = window.location.hash.slice(1);
        editDestination(destinationid,destination,city,duration,departureDate,imgUrl,JSON.parse(localStorage.getItem('auth')).email)
        .then(res => {          
            notify('Successfully edited destination','info'); 
                Router.go(`/details#${destinationid}`); 
        }).catch(res => {
            console.log('error');
            console.log(res);
        })
        
        
         
    }


    onBeforeEnter(location, commands) {
    }

    render() {
        render(template(this), this, { eventContext: this });
    }
};

export default EditDestination;