import React, { Component } from "react";
import ProfileImage from "./ProfileImage";

export default class MessagesList extends Component {
	
	constructor(props) {
    	super(props);

    	this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    //scroll down to the latest message
    scrollToBottom() {
    	this.el.scrollIntoView({ behavior: 'smooth' });
  	}

    componentDidMount() {
    	this.scrollToBottom();
    }
    
    componentDidUpdate() {
  		this.scrollToBottom();
  	}


	render() {
    	return (
		  	<div className="messages-wrap">	
				{this.props.messages.map((message, index) => {
				    return (

				      			<div 
				      			  key={index} 
				      			  className={(this.props.me === message.author) ? "message-container me" : "message-container"}
				      			>
						      		<ProfileImage />
						      		<div className="message-body">
						      			<div className="message-text">
						      				<p>{message.body}</p>
						      			</div>
						      			<div className="message-author">{message.author}</div>
						      		</div>	
						      	</div>
				      		)
				})}
				<div ref={el => { this.el = el; }} />	
			</div>
	)}
}