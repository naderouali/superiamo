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
  callbacks: {
    async signIn({ user, account, profile }) {
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
    },

    async session({ session, token, user }) {
      const userData = await User.findOne({ email: session.user.email });
      session.user = {
        ...session.user,
        firstName: userData.firstName,
        lastName: userData.lastName,
        birthdate: userData.birthdate,
        address: userData.address,
        phoneNumber: userData.phoneNumber,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
