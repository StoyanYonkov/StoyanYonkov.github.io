import { Router } from 'https://unpkg.com/@vaadin/router';
import { register , getUserData , logout} from '../services/authServices.js';




import Home from '../views/home.js';
import Login from '../views/login.js';
import Register from '../views/register.js';
import AddDestination  from '../views/addDestination.js';
import Details  from '../views/destination-details.js';
import UserDestinations from '../views/userDestinations.js';
import EditDestination from '../views/editDestination.js';


customElements.define('home-view', Home);
customElements.define('login-view', Login);
customElements.define('register-view', Register);
customElements.define('adddestination-view', AddDestination);
customElements.define('destinationdetails-view', Details);
customElements.define('userdestinations-view', UserDestinations);
customElements.define('edtidestination-view', EditDestination);


const root = document.getElementById('root');
const router = new Router(root);



router.setRoutes([
    {
        path: '/',
        component: 'home-view',
    },
    {
        path: '/register',
        component: 'register-view',
    },
    {
        path: '/login',
        component: 'login-view',
    },
    {
        path: '/details',
        component: 'destinationdetails-view',
    },
    {
        path: '/adddestination',
        component: 'adddestination-view',  
    },
    {
        path: '/userdestinations',
        component: 'userdestinations-view',  
    },
    {
        path: '/editdestination',
        component: 'edtidestination-view',  
    },
    {
        path: '/logout',
        action: (context, commands) => {
            console.log('Loged out!');
            console.log(context);
            console.log(commands);
            notify('Logout successful.','info')
            logout();                   
            return commands.redirect('/');
        }      
    }
]);