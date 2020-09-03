import { gql } from '@apollo/client';

export const POST_COMMENT = gql `
mutation postComment($comment: String!, $idPublication: ID!) {
  postComment(comment: $comment, idPublication: $idPublication){
    idUser{
      username
      avatar
    }
    idPublication
    comment
    createdAt
  }
}
`;

export const GET_COMMENTS = gql `
query getComments($idPublication: ID!) {
  getComments(idPublication: $idPublication) {
    idUser {
      username
      avatar
    }
    comment
  }
}
`;