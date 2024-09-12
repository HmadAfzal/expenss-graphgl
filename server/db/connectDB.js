import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect('mongodb://localhost:27017/graphql');
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.error(`Error: ${err.message}`);
		process.exit(1);
	}
};