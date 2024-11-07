// Setup providers - Google Authentication
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({ session }) {

    },
    async signIn({ profile }) {
        try {
            await connectToDB();
            
            // Check if a user already exists
            // If not, create new user and store on DB

            return true; // Successful sign in
        } catch (error) {
            console.log(error);
            return false;
            
        }
    }
})

export {handler as GET, handler as POST};