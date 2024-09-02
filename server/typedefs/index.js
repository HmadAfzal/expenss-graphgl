import { mergeTypeDefs } from "@graphql-tools/merge";
import transactionTypeDef from "./transaction.typedef.js";
import userTypeDef from "./user.typedef.js";

const mergedTypeDefs=mergeTypeDefs([transactionTypeDef, userTypeDef])

export default mergedTypeDefs;