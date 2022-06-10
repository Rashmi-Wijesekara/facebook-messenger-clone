import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@mui/material";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase/compat/app";
import FlipMove from "react-flip-move";
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';

function App() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([
		// {username: "Rain", message: "Hello guys"},
		// {username: "Messi", message: "Hi"}
	]);
	const [username, setUsername] = useState("");

	useEffect(() => {
		// run once when the app component loads
		// 'asc'
		db.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setMessages(snapshot.docs.map(
					(doc) =>(
						{
							id:doc.id, 
							message:doc.data()
						}
					)
				));
			});
		// onSnapshot() => will run every time when the db get a new record
	}, []);

	useEffect(() => {
		const name = prompt("Please enter your username");
		setUsername(name);
	}, []);

	const handleInputChange = (event) => {
		setInput(event.target.value);
	};

	const sendMessage = (event) => {
		// send message onClick function
		// all the logic to send a message

		db.collection("messages").add({
			message: input,
			username: username,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		setMessages([...messages, { username: username, message: input }]);
		setInput("");

		// stop refreshing the page when the form is submitted
		event.preventDefault();
	};

	return (
		<div className="App">
			{/* facebook messenger icon pulling from the official facebook */}
			<img src="https://en.facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"/>
			<h1>Facebook Messenger</h1>
			<h2>Welcome {username}</h2>
			<form className="app__form">
				<FormControl className="app__formControl">
					{/* input field */}
					<InputLabel>Enter a message...</InputLabel>
					<Input className="app__input" value={input} onChange={handleInputChange} />

					{/* button */}
					{/* button submit type will submit the form when click the enter button as well */}
					<IconButton
					className="app__iconButton"
						disabled={!input}
						type="submit"
						onClick={sendMessage}
						variant="contained"
						color="primary"
					>
						<SendIcon />
					</IconButton>
				</FormControl>
			</form>

			<FlipMove className="flip-move">
				{/* messages */}
				{messages.map(
					// key will avoid re-rendering the whole list
					// react know that it needs to add only the new item to the list
					({id,message}) => {
						return <Message key={id} username={username} message={message} />;
					}
				)}
			</FlipMove>
		</div>
	);
}

export default App;
