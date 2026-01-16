import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

function reqEnv(key) {
  const val = import.meta.env[key];
  if (!val || typeof val !== "string") {
    throw new Error(
      `Missing ${key}. Check your .env.local uses "=" (not ":") and restart Vite. Example: ${key}=your_value`
    );
  }
  return val;
}

const firebaseConfig = {
  apiKey: reqEnv("VITE_FIREBASE_API_KEY"),
  authDomain: reqEnv("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: reqEnv("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: reqEnv("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: reqEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: reqEnv("VITE_FIREBASE_APP_ID"),
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

