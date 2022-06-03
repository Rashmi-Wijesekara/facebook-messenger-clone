import React, {forwardRef} from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./Message.css";

const Message = forwardRef(({ message, username }, ref) => {

	const isUser = username === message.username

	return (
		<div ref={ref} className= {`message ${isUser && 'message__user'}`}>
			<Card className= {isUser ? "message__userCard": "message__guestCard"}>
				<CardContent>
					<Typography
						className="message__username"
						sx={{ fontSize: 11 }}
						color="text.secondary"
						component="div"
					>
						{!isUser && `${message.username || 'Unknown User'}:`}
					</Typography>
					<Typography sx={{ fontSize: 18 }}>{message.message}</Typography>
				</CardContent>
			</Card>
		</div>
	);
})

export default Message;
