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


const GET_PUBLICATIONS_FOLLOWEDS = gql `
query {
  getPublicationsFolloweds {
    id
    idUser {
      name
      username
      avatar
    }
    file
    typeFile
    createdAt
  }
}
`;

export {
    UPLOAD_PUBLICATION,
    GET_PUBLICATIONS,
    GET_PUBLICATIONS_FOLLOWEDS
}