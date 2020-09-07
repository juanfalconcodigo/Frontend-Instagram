import { gql } from '@apollo/client';

export const IS_FOLLOW = gql `
query isFollow($username:String!){
  isFollow(username:$username)
}
`;

export const FOLLOW = gql `
mutation follow($username:String!){
  follow(username:$username)
}
`;

export const UN_FOLLOW = gql `
mutation unFollow($username: String!) {
  unFollow(username: $username)
}
`;

export const FOLLOWERS = gql `
query getFollowers($username:String!){
  getFollowers(username:$username){
    id
    name
    username
    avatar
  }
}
`;

export const FOLLOWEDS = gql `
query getFolloweds($username: String!) {
  getFolloweds(username: $username) {
    name
    username
    avatar
  }
}
`;

export const GET_NOT_FOLLOWEDS = gql `
query{
  getNotFolloweds{
    name
    username
    avatar
  }
}
`;