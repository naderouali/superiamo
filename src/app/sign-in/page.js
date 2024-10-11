'use client';

import { signIn } from 'next-auth/react';
import styles from './SignIn.module.css';

export default function SignIn() {

    const handleSignIn = () => {
        signIn('google', { callbackUrl: '/profile' });
      };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>Superiamo</div>
        <h2 className={styles.title}>Welcome Back!</h2>
        <p className={styles.description}>Please sign in to continue to your account</p>
        <button onClick={handleSignIn} className={styles.signInButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className={styles.icon}
          >
            <path fill="#4285F4" d="M24 9.5c2.4 0 4.5.8 6.2 2.1l4.6-4.6C31.1 4.8 27.7 3.5 24 3.5 14.9 3.5 7.4 9.8 4.7 18.3l5.9 4.6C11.6 15.3 17.3 9.5 24 9.5z" />
            <path fill="#34A853" d="M46.5 24c0-1.6-.2-3.2-.6-4.6H24v9h12.7c-.5 2.5-2 4.7-4.2 6.1l6.5 5.1c3.8-3.5 6-8.6 6-14.6z" />
            <path fill="#FBBC05" d="M9.3 27.9C8.4 25.7 8 23.4 8 21s.4-4.7 1.3-6.9L3.4 9.4C1.3 13.5 0 17.9 0 21.9c0 4.1 1.3 8.5 3.4 12.6l6-4.7z" />
            <path fill="#EA4335" d="M24 43c3.7 0 7.1-1.2 9.7-3.3l-6.5-5.1c-1.5 1-3.4 1.6-5.2 1.6-6.6 0-12.3-5.8-13.4-12.8l-5.9 4.7c3.1 6.2 9.7 10.9 16.3 10.9z" />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
