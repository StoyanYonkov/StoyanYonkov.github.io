import { html, render, nothing } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { register , getUserData , login} from '../services/authServices.js';
import { addDestination } from '../services/destinationServices.js'



const template = (ctx) => html`  
  <!-- Create  -->
  <section id="viewAdddestination">
            <h2>Add new destination</h2>
            <form id="formAdddestination">
                <label for="destination">Destination name:</label>
                <input type="text" id="destination" name="destination" placeholder="Destination name">
                <label for="city">City:</label>
                <input type="text" id="city" name="city" placeholder="City">
                <label for="duration">Duration:</label>
                <input type="number" id="duration" name="duration" placeholder="Duration">
                <label for="departureDate">Departure Date:</label>
                <input type="date" id="departureDate" name="departureDate">
                <label for="imgUrl">Image:</label>
                <input type="text" id="imgUrl" name="imgUrl" placeholder="https://">

                <input type="submit" class="create" value="Add">
            </form>
        </section>
        `;




class AddDestination extends HTMLElement {
    constructor() {
        super();

       this.addEventListener('submit', this.onSubmit);
    }


    connectedCallback() {
        if(!getUserData().isAuthenticated) {       
            Router.go('/');
            return;
        }
        console.log('Loaded Add Destination');
        
      //  Object.assign(this, getUserData()) 

      
        this.render();
    }

    onSubmit(e) {
        console.log('Destination Submited')
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


        addDestination(destination,city,duration,departureDate,imgUrl,JSON.parse(localStorage.getItem('auth')).email)
        .then(res => {
            console.log(res);
            notify('Sucessfully Added New Destination','info');
            setTimeout(() => {
                Router.go('/');
             }, 1500);
        }).catch(res => {
            console.log('error');
            console.log(res);
        })

       
/*
        let res = login(email,password)
        .then(res => {
         notify('Successful Login', 'info');

         setTimeout(() => {
            Router.go('/');
         }, 1500);

         })
         .catch(err => {          
         notify(err, 'error');
         });

      */
         
    }


    onBeforeEnter(location, commands) {
    }

    render() {
        render(template(this), this, { eventContext: this });
    }
};

export default AddDestination;