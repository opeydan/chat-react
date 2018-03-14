import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import MessagesList from "../components/MessagesList";
import Contacts from "../components/Contacts";
import Dots from "../components/Dots";
import { Glyphicon } from "react-bootstrap";
import ChatHeader from "./ChatHeader";

// wait period for typing indicator
const WAIT_INTERVAL = 3000;

export default class ChatInstance extends Component {
	constructor(props) {
    	super(props);

    	this.typing = this.props.isTyping;
    	this.other = this.props.other;
    	this.uname = this.props.user;
    	this.state = {
    		messages: this.props.messages,
    		newMsg: '',
    		isTyping: this.props.isTyping,
    		meTyping: false,
    	}

    	this.handleChange = this.handleChange.bind(this);
    	this.handleSend = this.handleSend.bind(this);
  	}

  	componentWillMount() {
        this.timer = null;
    }

    // send message on Enter press
    handleKeyUp = event => {
	    if (event.key === 'Enter') 
	      		this.handleSend();
	}

	// create new message object and sends it to the parent to add to array of messages
    handleSend() {
  		const {newMsg} = this.state;
  		if (newMsg.length > 0) {
	  		const message = {
	  			author: this.uname,
	  			body: newMsg,
	  			created: new Date(),
	  		}

	  		this.setState({ newMsg: '' });
	  		this.props.sendMsgToParent(message);
  		}
  	}

  	// show typing state., send the state to parent component. It changes to FALSE once the timeout up
  	handleChange = event => {
  		clearTimeout(this.timer);

	    this.setState({
	      newMsg: event.target.value,
	      meTyping: true,
	    });

	    this.props.sendTypingToParent(this.state.meTyping);
        this.timer = setTimeout(this.triggerChange.bind(this), WAIT_INTERVAL);
        
	}

	// set the typing state to false on timeout end, update the parent component
	triggerChange() {
		this.setState({ meTyping: false });
	    this.props.sendTypingToParent(this.state.meTyping);
    }	


  render() {
    return (
    <Grid className="Chat pull-left">
	      			<ChatHeader uname={this.uname}/>

     				<Row className="containers row-eq-height">
	      				<Contacts other={this.other} />

	      				<Col xs={8} className="messages">
	      					<MessagesList 
	      						messages={this.props.messages} 
	      						me={this.uname} 
	      					/>
	      					{ this.props.isTyping ? <Dots /> : <p className="noDots"/> }

	      					<div className="message-input">
	      						<div className="text-input">
	      								<textarea 	
	      									onKeyUp={this.handleKeyUp} 
	      									onChange={this.handleChange} 
	      									value={this.state.newMsg} 
	      									placeholder="Write your message..."
	      								/>
	      						</div>

	      						<div className="actions">
	      							<button  
	      								onClick={this.handleSend} 
	      								type="submit">
	      									<Glyphicon glyph="send" />
	      							</button>
	      						</div>
	      					</div>	

	      				</Col>
	      			</Row>
	    </Grid>  			
    );
  }
}