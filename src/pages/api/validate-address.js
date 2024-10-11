import axios from 'axios';
import { calculateDistance } from '@/lib/calculateDistance';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ message: 'Address is required', isValid: false });
  }

  try {
    const response = await axios.get(
      `https://api-adresse.data.gouv.fr/search/`,
      {
        params: { q: address, limit: 1 }
      }
    );

    const { features } = response.data;

    if (features.length === 0) {
      return res.status(404).json({ message: 'Address not found', isValid: false });
    }

    const addressData = features[0];
    const [lon, lat] = addressData.geometry.coordinates;

    const parisLat = 48.8566;
    const parisLon = 2.3522;

    const distance = calculateDistance(parisLat, parisLon, lat, lon);

    if (distance <= 50) {
      return res.status(200).json({
        message: 'Address is within 50 km of Paris',
        distance,
        isValid: true
      });
    } else {
      return res.status(400).json({
        message: 'Address is not within 50 km of Paris',
        distance,
        isValid: false
      });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error validating address', error, isValid: false });
  }
}
