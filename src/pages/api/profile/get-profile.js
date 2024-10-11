export default async function handler(req, res) {
    if (req.method === 'GET') {
      const userData = {
        firstName: "",
        lastName: "",
        birthdate: "",
        address: "",
        phoneNumber: "",
      };
  
      return res.status(200).json(userData);
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }