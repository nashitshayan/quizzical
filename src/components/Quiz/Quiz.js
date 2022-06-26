import { useLocation } from 'react-router-dom';
function Quiz() {
	const location = useLocation();
	const quizData = location.state;
	console.log(quizData);

	const quiz = quizData.map((quizItem) => (
		<div>
			<h2>Question : {quizItem.question}</h2>

			<div>correct ans: {quizItem.correct_answer}</div>
		</div>
	));
	return <div>{quiz}</div>;
}

export default Quiz;
