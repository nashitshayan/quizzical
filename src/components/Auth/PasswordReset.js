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
import { useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';

function PasswordReset({ email, handleInput, error, setError }) {
	const [passwordResetStatus, setPasswordResetStatus] = useState(false);
	const { sendPasswordReset } = useUserAuth();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await sendPasswordReset(email);
			setPasswordResetStatus(true);
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
				{passwordResetStatus ? (
					<Box sx={{ textAlign: 'center', p: 1 }}>
						<Typography component='h5' variant='h5' sx={{ mb: 1 }}>
							Password reset mail sent!
						</Typography>
						<Typography component='small' variant='body2'>
							(Check in your spam folder if you don't find it.)
						</Typography>
						<Box sx={{ mt: 1 }}>
							<Link href='/' variant='h6'>
								Proceed to Log In
							</Link>
						</Box>
					</Box>
				) : (
					<>
						<Avatar sx={{ m: 1, bgcolor: '#293264' }}>
							<AccountCircleIcon />
						</Avatar>

						<Typography component='h1' variant='h5'>
							Reset Password
						</Typography>
						<Box
							component='form'
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}>
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
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 2, mb: 1, p: 1 }}>
								Reset Password
							</Button>

							<Grid container sx={{ mt: 1 }}>
								<Grid item>
									<Link href='/signup' variant='body2'>
										Don't have an account? Sign Up!
									</Link>
								</Grid>
							</Grid>
						</Box>
					</>
				)}
			</Box>
		</Container>
	);
}

export default PasswordReset;
