import { Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import PasswordReset from './Auth/PasswordReset';
import Home from './Quiz/Home';
import ProtectedRoute from './Auth/ProtectedRoute';
import { useState } from 'react';

function App() {
	const [username, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const handleInput = (name, value) => {
		if (name === 'username') setUserName(value);
		if (name === 'email') setEmail(value);
		if (name === 'password') setPassword(value);
	};
	return (
		<div className='app-wrapper'>
			<Routes>
				<Route
					path='/'
					element={
						<Login
							email={email}
							password={password}
							handleInput={handleInput}
							error={error}
							setError={(val) => setError(val)}
						/>
					}
				/>
				<Route
					path='/signup'
					element={
						<SignUp
							username={username}
							email={email}
							password={password}
							handleInput={handleInput}
							error={error}
							setError={(val) => setError(val)}
						/>
					}
				/>
				<Route
					path='/password-reset'
					element={
						<PasswordReset
							email={email}
							handleInput={handleInput}
							error={error}
							setError={(val) => setError(val)}
						/>
					}
				/>
				<Route
					path='/home'
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
