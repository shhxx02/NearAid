# NearAid

NearAid is a full-stack web application designed to help people donate essential items to nearby individuals or organizations in need.  
Instead of large-scale charity systems, NearAid focuses on **local, community-based aid**, making it easier to find and offer help within the same city.

The application allows users to post donations, browse available donations nearby, and securely accept them through an authenticated system.

---

🔗 **Live Application:**  
https://near-aid-3nqc.vercel.app/

---

## What the App Does:

- Users can create an account and log in
- Logged-in users can post donation listings (food, essentials, etc.)
- Other users can browse available donations
- Donations are filtered by city for relevance
- Each donation can be viewed in detail and accepted by another user
- Images of donations are uploaded and stored securely
- Only authenticated users can perform sensitive actions

---

## How the App Works :

### 1. Authentication
- Users sign up or log in using email and password
- Passwords are hashed using bcrypt before storing in the database
- On successful login, the backend generates a JWT (JSON Web Token)
- The token is stored in the browser (localStorage)
- The frontend uses this token to authenticate future requests

### 2. Frontend Authorization
- The app uses a global AuthContext to track login state
- Navigation and protected pages depend on whether the user is logged in
- Pages like **Donate**, **Browse**, and **Profile** are blocked if the user is not authenticated

### 3. Backend Authorization
- Protected backend routes use middleware to verify the JWT
- Requests without a valid token are rejected with an authorization error
- This ensures security even if frontend checks are bypassed

---

## Donation Flow

### Creating a Donation
1. User fills out a donation form
2. An image is selected and sent as multipart/form-data
3. Multer extracts the image from the request
4. The image is uploaded to Cloudinary
5. Cloudinary returns a secure image URL
6. The donation data + image URL are saved in MongoDB

### Browsing Donations
- Donations are fetched from the backend using Axios
- Users can browse all available donations or filter by city
- Each donation is displayed with details and image

### Accepting a Donation
- Only logged-in users can accept donations
- The backend verifies the user’s identity before allowing acceptance
- Donation status is updated accordingly

---

## Tech Stack

### Frontend
- React
- Context API (authentication state)
- Axios (API communication)
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Multer for file handling
- Cloudinary for image storage

### Deployment
- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted on MongoDB Atlas

---

## Project Structure

```
NearAid/
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── AcceptDonationModal.jsx
│       │   ├── DonationMap.jsx
│       │   ├── Footer.jsx
│       │   └── ProtectedRoute.jsx
│       ├── context/
│       │   └── AuthContext.js
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Browse.jsx
│       │   ├── Donate.jsx
│       │   ├── DonationDetail.jsx
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   └── Profile.jsx
│       ├── services/
│       │   └── api.js
│       ├── App.js
│       ├── index.js
│       └── App.css
├── server/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── donationController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Donation.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── donationroutes.js
│   ├── upload.js
│   ├── index.js
│   └── .env
└── README.md
```

