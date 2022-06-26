import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
function Home() {
	/*
	Alright, so the idea here is that once the user clicks on the start quiz button, we want the following to happen :
	1) Fetch the quiz data
	2) Navigate to our quiz page ('/quiz')
	3) Display the quiz
	
	However, because Home is not rendering the Quiz component, there is no direct way to pass down the quiz data as props. 

	I tried a few things : 

	1) At first I tried to have the state here in Home and fetch and set the data in an event handler. But I couldn't think of any good way to pass this data to the Quiz component.
	2) The second thing I tried was to have the state inside the Quiz component. On the start quiz btn click, simply nagivate to '/quiz'. Put the state to store the quizData and the useEffect to fetch the data on initial mount in the Quiz component. The downfall in this approach is that every time the user reloads while on the '/quiz' page, a new request is made and a new quiz be displayed. Nope, we don't want that.


	The Solution :
	I googled if there was a way to pass data with 'useNavigate' and turns out there is! 
	Found this answer on stack overflow - https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component 

	So I thought alright, I can set up an event handler that will - fetch the quiz data, set the new state, navigate to the quiz page with the state. 
	BUT, the issue here is that the setQuizData function is async, so I was passing an empty array every time.
	
	In the end, useEffect with quizData as the dependency came to the rescue, but I had to add in a check to skip it if the state array is empty. Not sure if this is the ideal solution but it seems to work for now. 

	*/
	const navigate = useNavigate();
	const [quizData, setQuizData] = useState([]);

	const handleGetQuiz = async () => {
		const res = await fetch('https://opentdb.com/api.php?amount=5');
		const data = await res.json();
		setQuizData(data.results);
	};
	useEffect(() => {
		if (quizData.length > 0) navigate('/quiz', { state: quizData });
	}, [quizData]);

	const { logOut } = useUserAuth();
	const handleLogOut = async () => {
		try {
			await logOut();
		} catch (err) {
			alert(err);
		}
	};
	return (
		<main className='home-wrapper'>
			<h2>It's Quiz TIme!</h2>
			<div className='btn-wrapper'>
				<button className='btn-primary'> Leaderboard</button>
				<button className='btn-primary' onClick={handleGetQuiz}>
					Start Quiz
				</button>
				<button className='btn-primary' onClick={handleLogOut}>
					Log Out
				</button>
			</div>
		</main>
	);
}

export default Home;
