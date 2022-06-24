import { Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import PasswordReset from './Auth/PasswordReset';
import Home from './Quiz/Home';

function App() {
	return (
		<div className='app-wrapper'>
			<Routes>
				<Route pasth='/' element={<Login />} />
				<Route pasth='/signup' element={<SignUp />} />
				<Route pasth='/password-reset' element={<PasswordReset />} />
				<Route pasth='/home' element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
