import { gql } from '@apollo/client'

const UPLOAD_PUBLICATION = gql `
mutation uploadPublish($file:Upload){
  publish(file:$file){
    status
    urlPublish
  }
}
`;

const GET_PUBLICATIONS = gql `
query getPublications($username: String!) {
  getPublications(username: $username) {
    id
    idUser
    file
    typeFile
    createdAt
  }
}
`;

export {
    UPLOAD_PUBLICATION,
    GET_PUBLICATIONS
}