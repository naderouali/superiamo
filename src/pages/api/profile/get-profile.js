export default async function handler(req, res) {
    if (req.method === 'GET') {
      // Replace this mock data with actual data fetching from your database or API
      const userData = {
        firstName: "",
        lastName: "",
        birthdate: "",
        address: "",
        phoneNumber: "",
      };
  
      return res.status(200).json(userData);
    } else {
      // Handle any other HTTP method
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }