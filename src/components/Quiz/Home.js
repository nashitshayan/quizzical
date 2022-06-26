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
		<main className='home-wrapper'>
			<h2>It's Quiz TIme!</h2>
			<div className='btn-wrapper'>
				<button className='btn-primary'> Leaderboard</button>
				<button className='btn-primary'>Start Quiz</button>
				<button className='btn-primary' onClick={handleLogOut}>
					Log Out
				</button>
			</div>
		</main>
	);
}

export default Home;
