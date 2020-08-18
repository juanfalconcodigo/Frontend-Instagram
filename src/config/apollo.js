import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from "apollo-link-context";
import { getToken } from '../utils/token';

const httpLink = createUploadLink({
    uri: 'http://localhost:4004/'
});

//es como un interceptor
const authLink = setContext((_, { headers }) => {
    //el token deve ser valido o manda un error
    const token = getToken();
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;