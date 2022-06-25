import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Login() {
	const handleSubmit = () => {};
	const inputOutlineOverride = {
		'& .MuiOutlinedInput-root.Mui-focused': {
			'& > fieldset': {
				borderColor: '#293264',
			},
		},
		'& .MuiInputLabel-root.Mui-focused': {
			color: '#293264',
		},
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
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						id='password'
						label='Password'
						name='password'
						autoComplete='current-password'
						sx={inputOutlineOverride}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}>
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
