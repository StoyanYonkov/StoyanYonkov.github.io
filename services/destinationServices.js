import { request } from './requestServices.js';

const databaseUrl = `https://softunitest-d54b4.firebaseio.com`;
const api = {
    movies: `${databaseUrl}/destinations.json`
};

export const getAllDestinations= async (searchText) => {
    let res = await request(api.movies, 'GET');
    
    
 
  //  return Object.keys(res).map(key => ({key, ...res[key]})).filter(x => !searchText || searchText == x.title);
  return Object.keys(res).map(key => ({key, ...res[key]})).filter(x => !searchText || searchText == x.creator);
};

export const deleteDestination= async (id) => {
    let res = await request(`${databaseUrl}/destinations/${id}.json`, 'DELETE');
    return res;
}

export const getOneDestination = async (id) => {
    let res = await request(`${databaseUrl}/destinations/${id}.json`, 'GET');

    return Object(res, {id});  
};
/*
export const likeMovie = async (id, creator) => {
    let res = await request(`${databaseUrl}/destinations/${id}/likes.json`, 'POST', {creator});

    return res;
}*/

export const addDestination = async (destination,city,duration,departureDate,imgUrl,creator) => {
    let res = await request(`${databaseUrl}/destinations.json`, 'POST', 
    {
        destination: destination, 
        city: city,
        duration: duration,
        departureDate: departureDate,
        imgUrl: imgUrl,
        creator: creator,      
    });
    return res;
}

export const editDestination = async (id,destination,city,duration,departureDate,imgUrl,creator) => {
    let res = await request(`${databaseUrl}/destinations/${id}.json`, 'PATCH', 
    {
        destination: destination, 
        city: city,
        duration: duration,
        departureDate: departureDate,
        imgUrl: imgUrl,
        creator: creator,      
    });
    return res;
}


     