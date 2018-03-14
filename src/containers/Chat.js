import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ChatHeader from "../components/ChatHeader";
import MessagesList from "../components/MessagesList";
import Contacts from "../components/Contacts";
import Dots from "../components/Dots";
import ChatInstance from "../components/ChatInstance";
import { Glyphicon } from "react-bootstrap";

// wait period for typing indicator
const WAIT_INTERVAL = 3000;

export default class Chat extends Component {
   	constructor(props) {
    	super(props);

    	this.uname = this.props.uname ? this.props.uname : "Test Test";
    	this.other = this.props.other ? this.props.other : "Other Other";

    	this.state = {
    		height : window.innerHeight,
    		messages: [],
    		newMsg: '',
    		isTyping: false,
    		otherIsTyping: false
    	}

    	this._onResize = this._onResize.bind(this);
    	this.handleSend = this.handleSend.bind(this);
    	this.addMsg = this.addMsg.bind(this);
    	this.getMsgFromOther = this.getMsgFromOther.bind(this);
    	this.getTypingStatus = this.getTypingStatus.bind(this);
    	//this.addTestMes = this.addTestMes.bind(this);
  	}

  	// get the full height of windows and keep it on window resize
  	_onResize() {
  		this.setState({ height: window.innerHeight })
  	}

  	componentDidMount() {
  		window.addEventListener('resize', this._onResize);
  		//this.addTestMes();
  	}

  	componentWillMount() {
        this.timer = null;
    }

  	componentWillUnmount() {
  		window.removeEventListener('resize', this._onResize)
  	}

  	// send message on Enter press
  	handleKeyUp = event => {
	    if (event.key === 'Enter') 
	      		this.handleSend();
	}

	// create new message object and add it to array of messages
	handleSend() {
  		const {newMsg} = this.state;
  		if (newMsg.length > 0) {
	  		const message = {
	  			author: this.uname,
	  			body: newMsg,
	  			created: new Date(),
	  		}
	  		this.addMsg(message)
  		}
  	}

  	// save newly typed message to the array of messages, empty the new message
  	addMsg = m => {
  		const {messages} = this.state;
  		messages.push(m);
  		this.setState({
  			messages:messages,
  			newMsg: ''	
  		});
  	}

	// show typing state. It changes to FALSE once the timeout up
  	handleChange = event => {
  		clearTimeout(this.timer);

	    this.setState({
	      newMsg: event.target.value,
	      isTyping: true,
	    });
        this.timer = setTimeout(this.triggerChange.bind(this), WAIT_INTERVAL);
	}

	// set the typing state to false on timeout end
	triggerChange() {
		this.setState({ isTyping: false });
    }	

  	//event handler to get the new message form the other user
  	getMsgFromOther = dataFromChild => {
        this.addMsg(dataFromChild)
    }

    // event handler to get the typing status from the other user
    getTypingStatus = childTyping => {
        this.setState({ otherIsTyping: childTyping });
    }

    //creates array of messages for testing puroses only
  	/*addTestMes() {
  		var {messages}	= this.state;

  		for (var i = 0; i < 30; i++) {
  			var author = (i%2===0) ? this.uname : this.other;
  			const newMsg = {
  				author: author,
  				body: `The body of message ${i}`,
  			}
  			messages.push(newMsg)
  		}
  		this.setState({messages:messages})
  	}*/

   	render() {
    	return (
    		<div className= "Chat-wrapper" style = {this.state}>
	      		<ChatInstance	
	      			messages = {this.state.messages} 
	      			isTyping = {this.state.isTyping} 
	      			other={this.uname}
	      			user={this.other}
	      			sendMsgToParent={this.getMsgFromOther}
	      			sendTypingToParent = {this.getTypingStatus}  
	      		/>

	  			<Grid className="Chat pull-left">
	  				<ChatHeader uname={this.uname}/>
	      			
	      			<Row className="containers row-eq-height">
	      				<Contacts other={this.other} />
	      				
	      				<Col xs={8} className="messages">
	      					<MessagesList 
	      						messages={this.state.messages} 
	      						me={this.uname}
	      					/>
	      					{ this.state.otherIsTyping ? <Dots /> : <p className="noDots"/> }
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
	      								type="submit"
	      							>
	      								<Glyphicon glyph="send" />
	      							</button>
	      						</div>
	      					</div>	

	      				</Col>
	      			</Row>
	  			</Grid>
  			</div>
  	)};

}