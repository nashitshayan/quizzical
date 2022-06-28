import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { inputOutlineOverride } from '../../styles/inline-styles';
import { useUserAuth } from '../../context/UserAuthContext';
import { useNavigate } from 'react-router';
import { Alert } from '@mui/material';
import { useState } from 'react';
function SignUp({ username, email, password, handleInput }) {
	const [error, setError] = useState('');
	const { signUp, updateUserName } = useUserAuth();
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError('');
			await signUp(email, password);
			await updateUserName(username);
			navigate('/');
		} catch (err) {
			setError(err.message);
		}
	};
	return (
		<Container component='main' maxWidth='xs' className='auth-container'>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: '#293264' }}>
					<AccountCircleIcon />
				</Avatar>

				<Typography component='h1' variant='h5'>
					Sign Up
				</Typography>
				<Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
					{error && (
						<Alert severity='error' sx={{ justifyContent: 'center' }}>
							{error}
						</Alert>
					)}
					<TextField
						margin='normal'
						required
						fullWidth
						id='username'
						label='Username'
						name='username'
						autoFocus
						sx={inputOutlineOverride}
						value={username}
						onChange={(e) => handleInput(e.target.name, e.target.value)}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						sx={inputOutlineOverride}
						value={email}
						onChange={(e) => handleInput(e.target.name, e.target.value)}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						type='password'
						id='password'
						label='Password'
						name='password'
						autoComplete='current-password'
						sx={inputOutlineOverride}
						value={password}
						onChange={(e) => handleInput(e.target.name, e.target.value)}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 1, p: 1 }}>
						Sign Up
					</Button>

					<Grid container sx={{ mt: 1 }}>
						<Grid item>
							<Link href='/' variant='body2'>
								Already have an account? Sign In!
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}

export default SignUp;
