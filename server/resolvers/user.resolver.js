import User  from "../models/user.model.js";
import Transaction from '../models/transaction.model.js'
import bcrypt from "bcryptjs";

const userResolvers = {
  Query: {
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        console.error("Error fetching user: ", error);
        throw new Error("Error fetching user");
      }
    },

    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (err) {
        console.error("Error in authUser: ", err);
        throw new Error("Internal server error");
      }
    },
  },
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, gender, password } = input;
        if (!username || !name || !gender || !password) {
          throw new Error("All fields are required");
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("Username is already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const boypfp = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlpfp = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === "male" ? boypfp : girlpfp,
        });

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        console.error("Error signing up user: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        if (!username || !password) {
          throw new Error("All fields are required");
        }
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        }); 
        if (!user) {
          throw new Error("Invalid credentials");
        }
        await context.login(user);
        return user;
      } catch (error) {
        console.error("Error in login:", error);
				throw new Error(error.message || "Internal server error");
      }
    },

    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw new Error("Error destroying session");
        });
        context.res.clearCookie("connect.sid");

        return { message: "Logged out successfully" };
      } catch (error) {
        console.error("Error in logout:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
  User:{
    transactions:async(parent)=>{
try {
  const transactions=await Transaction.find({userId:parent._id})
  return transactions
} catch (error) {
  console.error("Error fetching User: ", error);
  throw new Error(error.message || "Internal server error");
}
    }
  }
};

export default userResolvers;
