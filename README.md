# Profile Management Platform

This project is a profile management web application built with Next.js, React, and MongoDB. Users can view and update their profiles, validate addresses, and securely store their data in MongoDB. This project includes Google OAuth2 authentication, address validation, and user data validation.

## Features

- **User Authentication**: Login via Google using OAuth2.
- **Profile Management**: Users can view, edit, and validate profile details such as address and birthdate.
- **Address Validation**: Address must be within 50 km of Paris for it to be saved.
- **MongoDB Integration**: User profiles are saved and managed in MongoDB.
- **UI/UX Design**: Styled with CSS for a responsive and clean user interface.

---

## Technologies Used

- **Frontend**: Next.js, React, CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: Google OAuth2
- **Utilities**: Axios for API requests, date formatting

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v14+)
- **MongoDB** (local or cloud)
- **Google OAuth2 Credentials**

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/naderouali/superiamo.git
cd superiamo

### 2. Install Dependencies

npm install

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MONGODB_URI=your-mongodb-uri

### 4. Run MongoDB Server

If using a local MongoDB server, ensure it is running before starting the application.

### 5. Start the Development Server

npm run dev

The application will be available at `http://localhost:3000`.

---

## Project Structure

- **/pages/api**: Backend API routes, including profile and address validation.
- **/pages/profile**: Profile management page with form inputs.
- **/lib**: Custom helper functions like `calculateDistance`.
- **/components**: Reusable UI components.

---

## Usage

### Profile Management

1. Sign in using your Google account.
2. View and edit profile details, including first name, last name, birthdate, address, and phone number.
3. **Address Validation**: Enter an address and click "Validate Address." The address must be within 50 km of Paris to save.
4. Save changes and log out using the provided buttons.

---

## API Endpoints

- **POST /api/profile/update-profile**: Updates user profile information.
- **POST /api/validate-address**: Validates if the provided address is within 50 km of Paris.

---

## Styling

The app uses modular CSS for component styling. To modify styles, edit the CSS files in the **/styles** folder.


---

## Acknowledgments

- Thanks to [API Adresse](https://adresse.data.gouv.fr/api-doc/adresse) for geolocation data.