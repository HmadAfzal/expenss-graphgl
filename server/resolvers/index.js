import { mergeResolvers } from "@graphql-tools/merge";
import transactionResolvers from "./transaction.resolver.js";
import userResolvers from "./user.resolver.js";

const mergedResolvers=mergeResolvers([userResolvers, transactionResolvers])

export default mergedResolvers