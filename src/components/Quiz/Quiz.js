import { useLocation } from 'react-router-dom';
function Quiz() {
	const location = useLocation();
	const quizData = location.state;
	const shuffleAnswers = (wrongAnswersArray, correctAnswer) => {
		const answersArray = [...wrongAnswersArray, correctAnswer];
		for (let i = answersArray.length - 1; i > 0; i--) {
			const randomIndex = Math.floor(Math.random() * (i + 1));
			[answersArray[i], answersArray[randomIndex]] = [
				answersArray[randomIndex],
				answersArray[i],
			];
		}
		return answersArray;
	};
	const quiz = quizData.map((quizItem) => (
		<div className='quiz-item'>
			<h3>{quizItem.question}</h3>
			<div className='quiz-item__choices'>
				{shuffleAnswers(
					quizItem.incorrect_answers,
					quizItem.correct_answer,
				).map((choice) => (
					<li className='quiz-item__choices-choice'>{choice}</li>
				))}
			</div>
			<hr className='break-line' />
		</div>
	));
	return <div className='quiz-wrapper'>{quiz}</div>;
}

export default Quiz;
