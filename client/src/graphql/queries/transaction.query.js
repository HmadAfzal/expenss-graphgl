import { gql} from '@apollo/client';

export const GET_TRANSACTIONS  = gql`
  query GetTransactions {
    transactions {
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


export const GET_TRANSACTION = gql`
  query GetTransactions($transactionId: ID!)  {
    transaction(transactionId: $transactionId){
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


export const GET_TRANSACTION_STATISTICS = gql`
	query GetTransactionStatistics {
		categoryStatistics {
			category
			totalAmount
		}
	}
`;