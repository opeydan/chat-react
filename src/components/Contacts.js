import React from "react";
import { Col } from "react-bootstrap";
import ProfileImage from "./ProfileImage";

export default props =>
  <Col xs={4} className="contacts-container">
	    <div className="contact-wrap active">
	      	<ProfileImage />
	      	<div className="contact-name">{props.other}</div>
	    </div>
	     <div className="contact-wrap">
	      	<ProfileImage />
	      	<div className="contact-name">John Smith</div>
	    </div>
	</Col>