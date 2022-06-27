import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import {
	answerSelected,
	answerWrong,
	answerCorrect,
} from '../../styles/inline-styles';
import Quiz from './Quiz';
function Home() {
	const navigate = useNavigate();
	const { logOut } = useUserAuth();
	const [quizData, setQuizData] = useState([]);
	const [isQuiz, setIsQuiz] = useState(false);
	const [isSelected, setIsSelected] = useState(false);

	const handleAnswerSelected = (e) => {
		e.target.style = { answerSelected };
	};

	const handleGetQuiz = async () => {
		const res = await fetch(
			'https://opentdb.com/api.php?amount=5&type=multiple',
		);
		const data = await res.json();
		setQuizData(data.results);
		setIsQuiz(true);
	};

	const handleCheckAnswers = () => {};
	const handleLogOut = async () => {
		try {
			await logOut();
		} catch (err) {
			alert(err);
		}
	};
	return (
		<main className='home-wrapper'>
			<nav>
				<h2>It's Quiz Time!</h2>
				<div className='btn-wrapper'>
					<button className='btn-primary'> Leaderboard</button>
					<button className='btn-primary' onClick={handleLogOut}>
						Log Out
					</button>
				</div>
				<hr className='break-line' />
			</nav>
			<div className='quiz-wrapper'>
				{isQuiz ? (
					<>
						<Quiz quizData={quizData} />
						<div className='btn-wrapper'>
							<button className='btn-primary' onClick={handleCheckAnswers}>
								Check Answers
							</button>
						</div>
					</>
				) : (
					<>
						<div className='btn-wrapper'>
							<button className='btn-primary' onClick={handleGetQuiz}>
								Start Quiz
							</button>
						</div>
					</>
				)}
			</div>
		</main>
	);
}

export default Home;
