import client from "../../api/client"

export const login = (credentials) => {
    return client.post('/auth/login', {
        username: credentials.username,
        password: credentials.password,
    });
};