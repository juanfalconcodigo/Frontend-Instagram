import { gql } from '@apollo/client';

export const POST_LIKE = gql `
mutation postLike($idPublication:ID!){
  postLike(idPublication:$idPublication)
}
`;

export const IS_LIKE = gql `
query isLike($idPublication:ID!){
  isLike(idPublication:$idPublication)
}
`;

export const DELETE_LIKE = gql `
mutation deleteLike($idPublication: ID!) {
  deleteLike(idPublication: $idPublication)
}
`;

export const COUNT_LIKES = gql `
query countLikes($idPublication:ID!){
  countLikes(idPublication:$idPublication)
}
`;