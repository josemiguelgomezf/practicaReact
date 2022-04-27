import client from '../../api/client'
import Header from '../layout/Header';

export const getLatestAdverts = () => {
    return client.get('/v1/adverts');
}

export const getAdvert = (advertId) => {
    return client.get(`v1/adverts/${advertId}`);
}

export const createAdvert = advert => {
    console.log(advert);
    return client.post(`v1/adverts/`, {name: advert.name }, Headers= {
        'Content-Type': 'multipart/form-data'
    })
}