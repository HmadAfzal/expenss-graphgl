const userTypeDef=`#graphql
type User {
    _id:ID!
    username:String!
    name:String!
    gender:String!
    profilePicture:String
    password:String!
    transactions:[Transaction!]
}

type Query {
authUser:User 
user(userId:ID!):User!
}

type Mutation {
    signUp(input:signupInput):User!
    login(input:loginInput):User!
    logout:logoutResponse
}

input signupInput {
    username:String!
    name:String!
    gender:String!
    password:String!  
}

input loginInput {
    username:String!
    password:String!  
}

type logoutResponse {
    message:String!
}
`

export default userTypeDef

