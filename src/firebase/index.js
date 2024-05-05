// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDG3qr9XbVEuyY7I7J-gNiayL0jwf3ptHE',
	authDomain: 'moegpt-bb23f.firebaseapp.com',
	projectId: 'moegpt-bb23f',
	storageBucket: 'moegpt-bb23f.appspot.com',
	messagingSenderId: '272507535857',
	appId: '1:272507535857:web:7ba86fccd536e37450c450',
	measurementId: 'G-ES8K526TKQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
// connectAuthEmulator(auth, 'http://127.0.0.1:9099');
// if (location.hostname === 'localhost') {
// 	// Point to the Storage emulator running on localhost.
// 	connectStorageEmulator(storage, '127.0.0.1', 9199);
// }
