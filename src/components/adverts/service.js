import client from '../../api/client'

export const getLatestAdverts = () => {
    return client.get('/v1/adverts');
}

//Busca los anuncios en función de un filtro dado
export const getFilterAdverts = (filtro) => {
    return client.get(`/v1/adverts?${filtro}`);
}

//Elimina un anuncios en función de su id
export const deleteAdvert = (advertId) => {
    return client.delete(`v1/adverts/${advertId}`);
}

export const getAdvert = (advertId) => {
    return client.get(`v1/adverts/${advertId}`);
}

export const createAdvert = advert => {
    return client.post(`v1/adverts/`, advert)
}
