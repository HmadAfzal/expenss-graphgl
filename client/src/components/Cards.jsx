import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

const Cards = () => {
	const { loading, data } = useQuery(GET_TRANSACTIONS);

	if (loading) {
		return null;
	}

	// Access the transactions array from the data object
	const transactions = data?.transactions || [];

	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{transactions.map((transaction) => (
					<Card key={transaction._id} transaction={transaction} />
				))}
			</div>
		</div>
	);
};

export default Cards;
