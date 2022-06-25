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

function PasswordReset({ email, handleInput }) {
	const handleSubmit = () => {};

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
					Reset Password
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
			</Box>
		</Container>
	);
}

export default PasswordReset;
