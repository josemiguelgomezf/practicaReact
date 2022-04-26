import client from "../../api/client"

export const login = (credentials) => {

    return client.post('/auth/login', {
        email: credentials.email,
        password: credentials.password,
    });
};

export const register = (credentials) => {

    return client.post('/auth/signup', {
        email: credentials.email,
        password: credentials.password,
        username: credentials.username,
        name: credentials.name,
    });
};
