# Firebase Authentication Setup Guide

This app uses Firebase Authentication with the Firebase JS SDK for user authentication. Follow these steps to set up Firebase for your app.

## Prerequisites

- A Firebase account (create one at [firebase.google.com](https://firebase.google.com))
- Node.js and npm installed

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## Step 2: Register Your App

1. In the Firebase Console, click on the **Web** icon (</>) to add a web app
2. Register your app with a nickname (e.g., "RemindMe")
3. Firebase will provide you with a configuration object

## Step 3: Enable Authentication

1. In the Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** authentication
3. Optionally, enable other authentication providers (Google, Facebook, etc.)

## Step 4: Configure Environment Variables

1. Copy the `.env.example` file to create a new `.env` file:

   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase configuration values in the `.env` file:

   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key-here
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

   You can find these values in your Firebase Console under:
   **Project Settings** > **General** > **Your apps** > **SDK setup and configuration**

## Step 5: Install Dependencies

The required packages are already included in `package.json`. If you need to reinstall them:

```bash
npm install firebase @react-native-async-storage/async-storage
```

## Step 6: Run the App

Start the development server:

```bash
npm start
```

## Architecture Overview

### Firebase Configuration (`config/firebase.ts`)

- Initializes the Firebase app
- Sets up Firebase Auth with AsyncStorage persistence for React Native

### Authentication Context (`contexts/AuthContext.tsx`)

- Provides authentication state and methods throughout the app
- Handles sign-in, sign-up, sign-out, and password reset

### Authentication Screens

- **Login Screen** (`app/auth/login.tsx`): Email/password sign-in
- **Signup Screen** (`app/auth/signup.tsx`): User registration

### Protected Routes

The app automatically redirects users:

- Unauthenticated users → Login screen
- Authenticated users → Main app (tabs)

This is handled in `app/_layout.tsx` using the `RootLayoutNav` component.

## Usage

### Sign Up

1. Launch the app
2. Tap "Sign Up" on the login screen
3. Enter your name, email, and password
4. Tap "Sign Up"

### Sign In

1. Enter your email and password
2. Tap "Sign In"

### Sign Out

Add a sign-out button in your app using the `useAuth` hook:

```tsx
import { useAuth } from "@/contexts/AuthContext";

function ProfileScreen() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return <Button onPress={handleLogout} title="Sign Out" />;
}
```

## Security Notes

- **Never commit your `.env` file** to version control (it's already in `.gitignore`)
- The `.env.example` file shows the required variables without exposing real values
- For production apps, consider using Firebase Security Rules to protect your data

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"

- Check that your API key is correctly set in the `.env` file
- Ensure you're using the correct Firebase project

### "Firebase: Error (auth/network-request-failed)"

- Check your internet connection
- Verify that Firebase Authentication is enabled in your Firebase Console

### App redirects in a loop

- Clear the app's cache and restart
- Check that AsyncStorage is properly configured

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Expo Firebase Guide](https://docs.expo.dev/guides/using-firebase/)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
