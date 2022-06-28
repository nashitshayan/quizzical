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
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import { Alert } from '@mui/material';
import { useState } from 'react';
function Login({ email, password, handleInput }) {
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { signIn } = useUserAuth();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await signIn(email, password);
			navigate('/home');
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
					Sign In
				</Typography>

				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					{error && (
						<Alert severity='error' sx={{ justifyContent: 'center' }}>
							{error}
						</Alert>
					)}
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
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
						sx={{ mt: 3, mb: 2, p: 1 }}>
						Sign In
					</Button>

					<Grid container>
						<Grid item xs>
							<Link href='/password-reset' variant='body2'>
								Forgot Password?
							</Link>
						</Grid>
						<Grid item>
							<Link href='/signup' variant='body2'>
								Don't have an account? Sign Up!
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}

export default Login;
