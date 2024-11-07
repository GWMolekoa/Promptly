// Setup providers - Google Authentication
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
           // Keep running existing session and update for user(s)
    async session({ session }) {
        const sessionUser = await User.findOne({
            email: session.user.email
        })

        session.user.id = sessionUser._id.toString();

        return session;
    },
    async signIn({ profile }) {
        try {
            await connectToDB();
            console.log("Database connection established in signIn");
   
            const userExists = await User.findOne({ email: profile.email });
            console.log("User search completed");
   
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                });
                console.log("New user created in database");
            }
   
            return true; // Successful sign in
        } catch (error) {
            console.error("Sign-in error:", error);
            return false;           
        }
    }
    }
})

export {handler as GET, handler as POST};