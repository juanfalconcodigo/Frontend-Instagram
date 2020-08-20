import { gql } from '@apollo/client';

export const REGISTER = gql `
mutation postUser($userInput: UserInput!) {
  register(input: $userInput) {
    status
    message
    user {
      id
      name
      username
      email
      avatar
      siteWeb
      description
      password
      createdAt
    }
  }
}
`;


export const LOGIN = gql `
mutation postLogin($input:LoginInput!){
  login(input:$input){
    status
    message
    user{
       id
      name
      username
      email
      avatar
      siteWeb
      description
      password
      createdAt
    }
    token
  }
}
`;

export const GET_USER = gql `
query getUser($id:ID,$username:String){
  getUser(id:$id,username:$username){
     id
    name
    username
    email
    avatar
    siteWeb
    description
    password
    createdAt
  }
}
`;

export const UPDATE_AVATAR = gql `
mutation updateData($file:Upload){
  updateAvatar(file:$file){
    status
    urlAvatar
  }
}
`;

export const DELETE_AVATAR = gql `
mutation deleteAvatar{
  deleteAvatar
}
`;


export const UPDATE_USER = gql `
mutation updateUser($input:UserUpdateInput){
  updateUser(input:$input)
}
`;