import { gql } from "@apollo/client";
import { serviceInstanceAuth } from "../index";

function queryfunc() {
  return serviceInstanceAuth({
    type: "query",
    mutate: gql`
      query MyQuery {
        getAllPets {
          id
          name
        }
      }
    `,
  });
}

function singleCustomerQuery(ids: any) {
  return serviceInstanceAuth({
    type: "query",
    mutate: gql`
      query ($id: Int!) {
        owner(id: $id) {
          id
          name
        }
      }
    `,
    variables: {
      ...ids,
    },
  });
}

function createOwnerQuery(payload: any) {
  return serviceInstanceAuth({
    type: "mutate",
    mutate: gql`
      mutation ($createPetInput: CreatePetInput!) {
        createPet(createPetInput: $createPetInput) {
          name
        }
      }
    `,
    variables: {
      createPetInput: {
        name: payload,
        type: "dd",
        ownerId: 1000,
      },
    },
  });
}

function subscriptionQuery() {
  return serviceInstanceAuth({
    type: "subscribe",
    mutate: gql`
      subscription {
        petAdded {
          name
        }
      }
    `,
  });
}

export { queryfunc, singleCustomerQuery, createOwnerQuery, subscriptionQuery };
