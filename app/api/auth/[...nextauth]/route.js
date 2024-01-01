import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import connectToDB from '@/utils/database'
import User from '@/models/User'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    callbacks: {
        async session({session}) {
            const user = await User.findOne({email: session.user.email})
            session.user.id = user._id.toString();
            return session;
        },
        async signIn({account, profile, user, credentials}) {
            try {
                await connectToDB();
                console.log('Sign in attempt with ', account, profile, user, credentials);
                const findResult = await User.findOne({ email: profile.email})
                // create new
                if (findResult == null) {
                    if (!profile.email_verified) {
                        throw new Error("Un-verified email account is invalid");
                    }
                    await User.create({
                        email: profile.email,
                        username: profile.name.replaceAll(" ", "").toLowerCase(),
                        image: profile.image,
                        about: `Call me by ${profile.given_name}, my family name is ${profile.family_name}`,
                        institution: "none",
                        is_boss: false
                    })
                }
                return true;
            } catch (error) {
                console.log(error)
            }
            return false;
        }
    }
})

export {handler as GET, handler as POST}