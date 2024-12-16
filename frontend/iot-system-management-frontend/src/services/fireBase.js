import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBUNstERRMiTwUZadpNfmBD85l8eqdNkvo",
  authDomain: "iot-management-system-a92a6.firebaseapp.com",
  projectId: "iot-management-system-a92a6",
  storageBucket: "iot-management-system-a92a6.firebasestorage.app",
  messagingSenderId: "662895032529",
  appId: "1:662895032529:web:7f7707869df6194fe16df0",
  measurementId: "G-QT6D2XVMVP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Popup ayarlarını güncelle
googleProvider.setCustomParameters({
    prompt: 'select_account',
    display: 'popup'
});

export { auth, googleProvider };