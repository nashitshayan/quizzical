import { useLocation } from 'react-router-dom';
function Quiz() {
	const location = useLocation();
	const quizData = location.state;
	console.log(quizData);
	const shuffleAnswers = (wrongAnswersArray, correctAnswer) => {
		const answersArray = [...wrongAnswersArray, correctAnswer];
		console.log('before', answersArray);
		for (let i = answersArray.length - 1; i > 0; i--) {
			const randomIndex = Math.floor(Math.random() * (i + 1));
			[answersArray[i], answersArray[randomIndex]] = [
				answersArray[randomIndex],
				answersArray[i],
			];
		}
		console.log('after', answersArray);
		return answersArray;
	};
	const quiz = quizData.map((quizItem) => (
		<div>
			<h2>Question : {quizItem.question}</h2>
			<div>
				{shuffleAnswers(quizItem.incorrect_answers, quizItem.correct_answer)}
			</div>
			<div>correct ans: {quizItem.correct_answer}</div>
		</div>
	));
	return <div>{quiz}</div>;
}

export default Quiz;
