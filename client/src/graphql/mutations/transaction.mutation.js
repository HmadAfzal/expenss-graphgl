import { gql } from '@apollo/client';

export const ADD_TRANSACTION = gql`
  mutation AddTransaction($input: addTransactionInput!) {
    addTransaction(input: $input) {
    _id
    description
    paymentType
    category
    amount
    location
    date
    }
  }
`;


export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId) {
    _id
    }
  }
`;


export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($input: updateTransactionInput!) {
    updateTransaction(input: $input) {
    _id
    description
    paymentType
    category
    amount
    location
    date
    }
  }
`;