import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import Quiz from './Quiz';
function Home() {
	const { logOut } = useUserAuth();
	const [quizQuestions, setQuizQuestions] = useState([]);
	const [quizAnswers, setQuizAnswers] = useState([]);
	const [correctAnswers, setCorrectAnswers] = useState([]);
	const [isQuiz, setIsQuiz] = useState(false);
	const [isCheckAnswers, setIsCheckAnswers] = useState(false);
	const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

	const handleAnswerSelected = (qId, aId) => {
		setQuizAnswers((oldQuizAnswers) => {
			const updatedQuizAnswers = oldQuizAnswers.map(
				(quizItemAnswers, index) => {
					if (qId === index) {
						const updatedQuizItemAnswers = quizItemAnswers.map(
							(answer, index) => {
								if (aId === index) {
									return { ...answer, isSelected: !answer.isSelected };
								}
								return answer;
							},
						);
						return updatedQuizItemAnswers;
					}
					return quizItemAnswers;
				},
			);
			return updatedQuizAnswers;
		});
	};

	const processFechedData = (quizData) => {
		quizData.forEach((quizItem) => {
			const quizItemAnswers = [];
			quizItemAnswers.push({
				option: quizItem.correct_answer,
				isSelected: false,
			});
			quizItem.incorrect_answers.forEach((incorrectAns) =>
				quizItemAnswers.push({
					option: incorrectAns,
					isSelected: false,
				}),
			);

			setQuizAnswers((prevAnswers) => [
				...prevAnswers,
				shuffleAnswers(quizItemAnswers),
			]);
			setCorrectAnswers((prevCorrectAnswers) => [
				...prevCorrectAnswers,
				quizItem.correct_answer,
			]);
			setQuizQuestions((prevQuestions) => [
				...prevQuestions,
				quizItem.question,
			]);
		});
	};

	const handleGetQuiz = async () => {
		const res = await fetch(
			'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple',
		);
		const data = await res.json();
		processFechedData(data.results);
		setIsQuiz(true);
	};

	const handleCheckAnswers = () => {
		setQuizAnswers((oldQuizAnswers) => {
			const updatedQuizAnswers = oldQuizAnswers.map(
				(quizItemAnswers, index) => {
					const updatedQuizItemAnswers = quizItemAnswers.map((answer) => {
						if (answer.isSelected) {
							if (answer.option === correctAnswers[index]) {
								return { ...answer, isCorrect: true };
							}
							return { ...answer, isInCorrect: true };
						}
						return answer;
					});
					return updatedQuizItemAnswers;
				},
			);
			return updatedQuizAnswers;
		});

		setIsCheckAnswers(true);
	};

	const handlePlayAgain = () => {
		setQuizAnswers([]);
		setCorrectAnswers([]);
		setQuizQuestions([]);
		setCorrectAnswerCount(0);
		setIsCheckAnswers(false);
		handleGetQuiz();
	};

	const handleLogOut = async () => {
		try {
			await logOut();
		} catch (err) {
			alert(err);
		}
	};

	//count the correct answers
	useEffect(() => {
		if (isCheckAnswers) {
			let count = 0;
			quizAnswers.forEach((quizItemAnswers) =>
				quizItemAnswers.forEach((answer) => {
					if (answer.isCorrect) {
						count++;
					}
				}),
			);
			setCorrectAnswerCount(count);
		}
	}, [isCheckAnswers]);

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
						<Quiz
							quizQuestions={quizQuestions}
							quizAnswers={quizAnswers}
							handleAnswerSelected={handleAnswerSelected}
						/>
						<div className='btn-wrapper'>
							{isCheckAnswers ? (
								<>
									<h4>You scored {correctAnswerCount}/5 correct answers</h4>
									<button className='btn-primary' onClick={handlePlayAgain}>
										Play Again
									</button>
								</>
							) : (
								<button className='btn-primary' onClick={handleCheckAnswers}>
									Check Answers
								</button>
							)}
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
function shuffleAnswers(answersArray) {
	for (let i = answersArray.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		[answersArray[i], answersArray[randomIndex]] = [
			answersArray[randomIndex],
			answersArray[i],
		];
	}
	return answersArray;
}
