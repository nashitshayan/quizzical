import { Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import PasswordReset from './Auth/PasswordReset';
import Home from './Quiz/Home';

function App() {
	return (
		<div className='app-wrapper'>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/password-reset' element={<PasswordReset />} />
				<Route path='/home' element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
