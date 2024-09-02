const transactionTypeDef=`#graphql
type Transaction {
    _id:ID!
    userId:ID!
    description:String!
    paymentType:String!
    category:String!
    amount:Float!
    location:String
    date:String!
}

type Query {
    transactions:[Transaction!]
    transaction(transactionId:ID!):Transaction
    categoryStatistics: [CategoryStatistics!]
}

type Mutation {
    addTransaction(input:addTransactionInput):Transaction!
    updateTransaction(input:updateTransactionInput):Transaction!
    deleteTransaction( transactionId: ID!):Transaction!
}

type CategoryStatistics {
    category: String!
    totalAmount: Float!
  }


input addTransactionInput {
    description:String!
    paymentType:String!
    category:String!
    amount:Float!
    location:String
    date:String!
}

input updateTransactionInput {
    transactionId: ID!
    description:String
    paymentType:String
    category:String
    amount:Float
    location:String
    date:String
}
`

export default transactionTypeDef