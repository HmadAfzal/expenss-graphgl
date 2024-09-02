import  Transaction  from "../models/transaction.model.js";

const transactionResolvers = {
  Query: {
    transactions: async (_, __, context) => { // Changed _ to __ to indicate unused arguments
      try {
        const user = context.getUser();
        if (!user) throw new Error("Unauthorized");
        const userId = user._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error) {
        console.error("Error fetching transactions:", error);
        throw new Error("Error fetching transactions");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findOne({ _id: transactionId }); // Corrected the typo
        if (!transaction) throw new Error("Transaction not found");
        return transaction;
      } catch (error) {
        console.error("Error fetching transaction:", error);
        throw new Error("Error fetching transaction");
      }
    },
    categoryStatistics: async (_, __, context) => {
			if (!context.getUser()) throw new Error("Unauthorized");

			const userId = context.getUser()._id;
			const transactions = await Transaction.find({ userId });
			const categoryMap = {};

			transactions.forEach((transaction) => {
				if (!categoryMap[transaction.category]) {
					categoryMap[transaction.category] = 0;
				}
				categoryMap[transaction.category] += transaction.amount;
			});

			return Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }));
		},
  },
  Mutation: {
    addTransaction: async (_, { input }, context) => {
      try {
				const newTransaction = new Transaction({
					...input,
					userId: context.getUser()._id,
				});
				await newTransaction.save();
				return newTransaction;
			} catch (err) {
				console.error("Error creating transaction:", err);
				throw new Error("Error creating transaction");
			}
    },
    updateTransaction: async (_, { input }, context) => {
      try {
        const user = context.getUser();
        if (!user) throw new Error("Unauthorized");
        const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {
          new: true,
        });
        if (!updatedTransaction) throw new Error("Transaction not found");
        return updatedTransaction;
      } catch (error) {
        console.error("Error updating transaction:", error);
        throw new Error("Error updating transaction");
      }
    },
    deleteTransaction: async (_, { transactionId }, context) => {
      try {
        const user = context.getUser();
        if (!user) throw new Error("Unauthorized");
        const transaction = await Transaction.findByIdAndDelete(transactionId); // Corrected the function call
        if (!transaction) throw new Error("Transaction not found");
        return transaction;
      } catch (error) {
        console.error("Error deleting transaction:", error); // Corrected the variable name
        throw new Error("Error deleting transaction");
      }
    },
  },
};

export default transactionResolvers;
