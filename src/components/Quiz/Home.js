import React from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
function Home() {
	const { logOut } = useUserAuth();
	const handleLogOut = async () => {
		try {
			await logOut();
		} catch (err) {
			alert(err);
		}
	};
	return (
		<div>
			Home
			<button onClick={handleLogOut} className='btn-cv-toggle'>
				Log Out
			</button>
		</div>
	);
}

export default Home;
