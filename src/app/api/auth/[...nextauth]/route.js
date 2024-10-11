import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await dbConnect();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            email: user.email,
            firstName: profile.given_name || '',
            lastName: profile.family_name || '',
            birthdate: '', 
            address: '',
            phoneNumber: '',
          });
        }

        return true; 
      } catch (error) {
        console.error('Error during sign-in:', error);
        return false;
      }
    },

    async session({ session, token, user }) {
      try {
        await dbConnect();

        const userData = await User.findOne({ email: session.user.email });

        if (userData) {
          session.user = {
            ...session.user,
            firstName: userData.firstName,
            lastName: userData.lastName,
            birthdate: userData.birthdate,
            address: userData.address,
            phoneNumber: userData.phoneNumber,
          };
        }

        return session; 
      } catch (error) {
        console.error('Error during session callback:', error);
        return session; 
      }
    },
  },
});

export { handler as GET, handler as POST };
