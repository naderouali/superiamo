'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './Profile.module.css';

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [validationMessage, setValidationMessage] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [addressValidated, setAddressValidated] = useState(false); 

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    address: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    if (session) {
      const { name, email } = session.user;
      const { firstName, lastName, birthdate, address, phoneNumber } = session.user;

      const formattedBirthdate = birthdate ? new Date(birthdate).toISOString().split('T')[0] : '';

      setUser({
        firstName: firstName || name.split(' ')[0] || '',
        lastName: lastName || name.split(' ')[1] || '',
        birthdate: formattedBirthdate || '',
        address: address || '',
        phoneNumber: phoneNumber || '',
        email: email || '',
      });
    }
  }, [session]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("Address Validated: ", addressValidated); 
    // console.log("Is Address Valid: ", isAddressValid); 

    if (!addressValidated || !isAddressValid) {
      alert('Please validate the address before saving changes.');
      return;
    }

    if (!user.firstName || !user.lastName || !user.email) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/profile/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  const handleValidateAddress = async () => {
    try {
      const response = await axios.post('/api/validate-address', { address: user.address });
      const isValid = response.data.isValid; 
  
      setIsAddressValid(isValid); 
      setAddressValidated(true); 
      setValidationMessage(response.data.message);
  
    //   console.log("Validation response: ", response.data.message);
    //   console.log("Is valid: ", isValid); 
    } catch (error) {
      setIsAddressValid(false);
      setAddressValidated(true);
      setValidationMessage(error.response?.data?.message || 'Error occurred');
  
      console.log("Validation Error: ", error.response?.data?.message || 'Error occurred');
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/sign-in' });
  };

  if (!session) {
    return (
      <div className={styles.container}>
        <p className="text-lg text-gray-800">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Your Profile</h2>

        <div>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
                type="text"
                id="email"
                name="email"
                value={user.email}
                className={styles.input}
                disabled
            />
        </div>

        <div>
          <label htmlFor="firstName" className={styles.label}>First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div>
          <label htmlFor="lastName" className={styles.label}>Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div>
          <label htmlFor="birthdate" className={styles.label}>Birthdate</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={user.birthdate}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className={styles.label}>Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter your phone number"
          />
        </div>

        <div className={styles.addressValidationContainer}>
          <label htmlFor="address" className={styles.label}>Address</label>
          <div className={styles.addressValidation}>
            <input
              type="text"
              id="address"
              name="address"
              value={user.address}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your address"
            />
            <button
              type="button"
              onClick={handleValidateAddress}
              className={`${styles.button} ${styles.validateButton}`}
            >
              Validate Address
            </button>
          </div>
          <p className={styles.validationMessage}>{validationMessage}</p>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button}>Save Changes</button>
          <button type="button" onClick={handleLogout} className={styles.logoutButton}>
            Log Out
          </button>
        </div>
      </form>
    </div>
  );
}
