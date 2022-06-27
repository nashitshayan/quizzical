import {
	answerCorrect,
	answerDefault,
	answerSelected,
	answerIncorrect,
} from '../../styles/inline-styles';

function Quiz({
	quizQuestions,
	quizAnswers,
	handleAnswerSelected,
	answerStyle,
}) {
	const quiz = quizQuestions.map((quizQuestion, qIndex) => (
		<div className='quiz-item' key={qIndex}>
			<h3>{quizQuestion}</h3>
			<div className='quiz-item__options'>
				{quizAnswers[qIndex].map((quizAnswer, aIndex) => (
					<li
						key={aIndex}
						style={quizAnswer.isSelected ? answerSelected : answerDefault}
						className='quiz-item__options-option'
						onClick={() => handleAnswerSelected(qIndex, aIndex)}>
						{quizAnswer.option}
					</li>
				))}
			</div>
			<hr className='break-line' />
		</div>
	));
	return <>{quiz}</>;
}

export default Quiz;
