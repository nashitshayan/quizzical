import { inititlizeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyDC0IZOBRL0sVxsbTS6hyszykWrE0rdPb4',
	authDomain: 'quizzical-37f30.firebaseapp.com',
	projectId: 'quizzical-37f30',
	storageBucket: 'quizzical-37f30.appspot.com',
	messagingSenderId: '394396608964',
	appId: '1:394396608964:web:b72ebed6ba2400d6ce1c91',
};

const app = inititlizeApp(firebaseConfig);

export { app };
