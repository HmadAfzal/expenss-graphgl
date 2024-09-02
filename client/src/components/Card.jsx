import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import { GET_TRANSACTION_STATISTICS, GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { formatDate } from "../utils/formatDate";
import {GET_AUTHENTICATED_USER} from '../graphql/queries/user.query'
const categoryColorMap = {
	saving: "from-green-700 to-green-400",
	expense: "from-pink-800 to-pink-600",
	investment: "from-blue-700 to-blue-400",
};



const Card = ({ transaction }) => {
	const cardClass = categoryColorMap[transaction.category];
	const [DeleteTransaction, { data, loading }] = useMutation(DELETE_TRANSACTION, { refetchQueries: [GET_TRANSACTIONS,GET_TRANSACTION_STATISTICS] });
	const { loading:userloading, data:userData } = useQuery(GET_AUTHENTICATED_USER);
console.log(userData)
	const handlDeleteTransaction = async (transactionId) => {
		console.log(transactionId)
		try {
			await DeleteTransaction({ variables: { transactionId: transactionId } });
			toast.success("Transaction deleted successfully");

		} catch (error) {
			toast.error(error.message);
		}
	}
	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>{transaction.category}</h2>
					<div className='flex items-center gap-2'>
						<FaTrash className={"cursor-pointer"} onClick={() => { handlDeleteTransaction(transaction._id) }} />
						<Link to={`/transaction/${transaction._id}`}>
							<HiPencilAlt className='cursor-pointer' size={20} />
						</Link>
					</div>
				</div>
				<p className='text-white flex items-center gap-1'>
					<BsCardText />
					Description: {transaction.description}
				</p>
				<p className='text-white flex items-center gap-1'>
					<MdOutlinePayments />
					Payment Type: {transaction.paymentType}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaSackDollar />
					Amount: {transaction.amount}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaLocationDot />
					Location: {transaction.lication}
				</p>
				<div className='flex justify-between items-center'>
					<p className='text-xs text-black font-bold'>{formatDate(transaction.date)}</p>
					<img
						src={userData?.authUser?. profilePicture}
						className='h-8 w-8 border rounded-full'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};
export default Card;