import React from "react";
import { Row, Col } from "react-bootstrap";
import ProfileImage from "./ProfileImage";

export default props =>
  <Row className="header">
    <Col xs={4} className="contacts-header">Contacts</Col>
    <Col xs={8} className="profile-bar">
        <div className = "profile-name"> { props.uname } </div>
        <ProfileImage />
    </Col>
  </Row>;