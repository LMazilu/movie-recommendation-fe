import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

/** firebase configuration with env variables */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

/** exporting the needed firebase services */
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

/**
 * Retrieves the URL of an image stored in Firebase storage.
 *
 * @param {string} folder - The folder where the image is stored.
 * @param {string} fileName - The name of the image file.
 * @return {Promise<string|null>} A Promise that resolves to the URL of the image, or null if an error occurs.
 */
export const getImageUrl = async (folder: string, fileName: string) => {
  const fileRef = ref(storage, `${folder}/${fileName.toLowerCase()}`);
  try {
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error("Error getting image URL:", error);
    return null;
  }
};

export default app;
