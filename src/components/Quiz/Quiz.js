import {
	answerCorrect,
	answerDefault,
	answerSelected,
	answerIncorrect,
} from '../../styles/inline-styles';
import { decode } from 'he';
function Quiz({ quizQuestions, quizAnswers, handleAnswerSelected }) {
	const customAnswerStyles = (answer) => {
		if (answer.isCorrect) return answerCorrect;
		if (answer.isInCorrect) return answerIncorrect;
		if (answer.isSelected) return answerSelected;
		return answerDefault;
	};
	const quiz = quizQuestions.map((quizQuestion, qIndex) => (
		<div className='quiz-item' key={qIndex}>
			<h3>{decode(quizQuestion)}</h3>
			<div className='quiz-item__options'>
				{quizAnswers[qIndex].map((quizAnswer, aIndex) => (
					<li
						key={aIndex}
						style={customAnswerStyles(quizAnswer)}
						className='quiz-item__options-option'
						onClick={() => handleAnswerSelected(qIndex, aIndex)}>
						{decode(quizAnswer.option)}
					</li>
				))}
			</div>
			<hr className='break-line' />
		</div>
	));
	return <>{quiz}</>;
}

export default Quiz;
