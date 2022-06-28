import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Leaderboard() {
	const [playersData, setPlayersData] = useState([]);
	useEffect(() => {
		async function getDataFromDB() {
			const updatedPlayersData = [];
			const usersSnap = await getDocs(collection(db, 'users'));
			usersSnap.forEach((doc) => {
				updatedPlayersData.push(doc.data());
			});
			setPlayersData(updatedPlayersData);
		}
		getDataFromDB();
	}, []);
	return (
		<div className='leaderboard-wrapper'>
			<h2 className='leaderboard-heading'>LEADERBOARD</h2>
			<TableContainer component={Paper} id='leaderboard-table'>
				<Table aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell align='center'>Player Name</TableCell>
							<TableCell align='center'>Score</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{playersData.map((playerData, index) => (
							<TableRow
								key={index}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell align='center' component='th' scope='row'>
									{playerData.name}
								</TableCell>
								<TableCell align='center'>{playerData.score}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
