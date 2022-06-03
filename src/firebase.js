import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyA56BBBnBc10j9OlOz2ShYZ4EFU4x68mPE",
	authDomain: "facebook-messenger-clone-bbf33.firebaseapp.com",
	projectId: "facebook-messenger-clone-bbf33",
	storageBucket: "facebook-messenger-clone-bbf33.appspot.com",
	messagingSenderId: "769805386833",
	appId: "1:769805386833:web:7e2a7721a59b06436ea470",
	measurementId: "G-83WZRDB6JR",
});

// the database
const db = firebaseApp.firestore();

export default db
