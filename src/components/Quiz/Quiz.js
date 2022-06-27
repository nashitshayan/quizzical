function Quiz({ quizData }) {
	const quiz = quizData.map((quizItem, index) => (
		<div className='quiz-item' key={index}>
			<h3>{quizItem.question}</h3>
			<div className='quiz-item__choices'>
				{shuffleAnswers(
					quizItem.incorrect_answers,
					quizItem.correct_answer,
				).map((choice, index) => (
					<li key={index} className='quiz-item__choices-choice'>
						{choice}
					</li>
				))}
			</div>
			<hr className='break-line' />
		</div>
	));
	return <>{quiz}</>;
}

export default Quiz;

function shuffleAnswers(wrongAnswersArray, correctAnswer) {
	const answersArray = [...wrongAnswersArray, correctAnswer];
	for (let i = answersArray.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		[answersArray[i], answersArray[randomIndex]] = [
			answersArray[randomIndex],
			answersArray[i],
		];
	}
	return answersArray;
}
