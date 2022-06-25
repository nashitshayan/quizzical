import { createContext, useContext, useState, useEffect } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	sendPasswordResetEmail,
	updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';

// create context
const userAuthContext = createContext();

// set up the auth context provider

export function UserAuthContextProvider({ children }) {
	const [user, setUser] = useState('');
	const [isPending, setIsPending] = useState(true);

	function signUp(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	function signIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function logOut() {
		return signOut(auth);
	}
	function googleSignIn() {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleAuthProvider);
	}
	function sendPasswordReset(email) {
		return sendPasswordResetEmail(auth, email);
	}
	function updateUserName(name) {
		return updateProfile(auth.currentUser, { displayName: name });
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setIsPending(false);
		});
		return () => unsubscribe();
	}, []);
	if (isPending)
		return (
			<div className='loading-wrapper'>
				<span>Loading...</span>
			</div>
		);
	return (
		<userAuthContext.Provider
			value={{
				user,
				signUp,
				signIn,
				logOut,
				googleSignIn,
				sendPasswordReset,
				updateUserName,
			}}>
			{children}
		</userAuthContext.Provider>
	);
}

export function useUserAuth() {
	return useContext(userAuthContext);
}
