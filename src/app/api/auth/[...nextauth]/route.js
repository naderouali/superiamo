// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
// });

// export { handler as GET, handler as POST };


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

      // Check if the user already exists
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // If not, create a new user record in MongoDB
        await User.create({
          email: user.email,
          firstName: profile.given_name || '',
          lastName: profile.family_name || '',
          birthdate: '', // Ask for birthdate later if needed
          address: '',
          phoneNumber: '',
        });
      }

      return true;
    },

    async session({ session, token, user }) {
      // Send additional user data from MongoDB to the session
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
