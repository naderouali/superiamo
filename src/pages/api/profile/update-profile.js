import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect();

      const { email, firstName, lastName, birthdate, address, phoneNumber } = req.body;

      // Ensure email is provided
      if (!email) {
        return res.status(400).json({ message: 'Email is required for updating profile' });
      }

      // Find the user by email and update their profile
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { firstName, lastName, birthdate, address, phoneNumber },
        { new: true } // This returns the updated document
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ message: 'Failed to update profile' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
